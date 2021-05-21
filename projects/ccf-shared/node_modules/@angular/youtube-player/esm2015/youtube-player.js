/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Workaround for: https://github.com/bazelbuild/rules_nodejs/issues/1265
/// <reference types="youtube" />
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, Output, ViewChild, ViewEncapsulation, Inject, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { combineLatest, merge, Observable, of as observableOf, pipe, Subject, of, BehaviorSubject, fromEventPattern, } from 'rxjs';
import { combineLatest as combineLatestOp, distinctUntilChanged, filter, map, publish, scan, skipWhile, startWith, take, takeUntil, withLatestFrom, switchMap, tap, mergeMap, } from 'rxjs/operators';
export const DEFAULT_PLAYER_WIDTH = 640;
export const DEFAULT_PLAYER_HEIGHT = 390;
/**
 * Angular component that renders a YouTube player via the YouTube player
 * iframe API.
 * @see https://developers.google.com/youtube/iframe_api_reference
 */
export class YouTubePlayer {
    constructor(_ngZone, platformId) {
        this._ngZone = _ngZone;
        this._youtubeContainer = new Subject();
        this._destroyed = new Subject();
        this._playerChanges = new BehaviorSubject(undefined);
        this._videoId = new BehaviorSubject(undefined);
        this._height = new BehaviorSubject(DEFAULT_PLAYER_HEIGHT);
        this._width = new BehaviorSubject(DEFAULT_PLAYER_WIDTH);
        this._startSeconds = new BehaviorSubject(undefined);
        this._endSeconds = new BehaviorSubject(undefined);
        this._suggestedQuality = new BehaviorSubject(undefined);
        this._playerVars = new BehaviorSubject(undefined);
        /** Outputs are direct proxies from the player itself. */
        this.ready = this._getLazyEmitter('onReady');
        this.stateChange = this._getLazyEmitter('onStateChange');
        this.error = this._getLazyEmitter('onError');
        this.apiChange = this._getLazyEmitter('onApiChange');
        this.playbackQualityChange = this._getLazyEmitter('onPlaybackQualityChange');
        this.playbackRateChange = this._getLazyEmitter('onPlaybackRateChange');
        this._isBrowser = isPlatformBrowser(platformId);
    }
    /** YouTube Video ID to view */
    get videoId() { return this._videoId.value; }
    set videoId(videoId) {
        this._videoId.next(videoId);
    }
    /** Height of video player */
    get height() { return this._height.value; }
    set height(height) {
        this._height.next(height || DEFAULT_PLAYER_HEIGHT);
    }
    /** Width of video player */
    get width() { return this._width.value; }
    set width(width) {
        this._width.next(width || DEFAULT_PLAYER_WIDTH);
    }
    /** The moment when the player is supposed to start playing */
    set startSeconds(startSeconds) {
        this._startSeconds.next(startSeconds);
    }
    /** The moment when the player is supposed to stop playing */
    set endSeconds(endSeconds) {
        this._endSeconds.next(endSeconds);
    }
    /** The suggested quality of the player */
    set suggestedQuality(suggestedQuality) {
        this._suggestedQuality.next(suggestedQuality);
    }
    /**
     * Extra parameters used to configure the player. See:
     * https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5#Parameters
     */
    get playerVars() { return this._playerVars.value; }
    set playerVars(playerVars) {
        this._playerVars.next(playerVars);
    }
    ngOnInit() {
        // Don't do anything if we're not in a browser environment.
        if (!this._isBrowser) {
            return;
        }
        let iframeApiAvailableObs = observableOf(true);
        if (!window.YT || !window.YT.Player) {
            if (this.showBeforeIframeApiLoads && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw new Error('Namespace YT not found, cannot construct embedded youtube player. ' +
                    'Please install the YouTube Player API Reference for iframe Embeds: ' +
                    'https://developers.google.com/youtube/iframe_api_reference');
            }
            const iframeApiAvailableSubject = new Subject();
            this._existingApiReadyCallback = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (this._existingApiReadyCallback) {
                    this._existingApiReadyCallback();
                }
                this._ngZone.run(() => iframeApiAvailableSubject.next(true));
            };
            iframeApiAvailableObs = iframeApiAvailableSubject.pipe(take(1), startWith(false));
        }
        // An observable of the currently loaded player.
        const playerObs = createPlayerObservable(this._youtubeContainer, this._videoId, iframeApiAvailableObs, this._width, this._height, this._playerVars, this._ngZone).pipe(tap(player => {
            // Emit this before the `waitUntilReady` call so that we can bind to
            // events that happen as the player is being initialized (e.g. `onReady`).
            this._playerChanges.next(player);
        }), waitUntilReady(player => {
            // Destroy the player if loading was aborted so that we don't end up leaking memory.
            if (!playerIsReady(player)) {
                player.destroy();
            }
        }), takeUntil(this._destroyed), publish());
        // Set up side effects to bind inputs to the player.
        playerObs.subscribe(player => {
            this._player = player;
            if (player && this._pendingPlayerState) {
                this._initializePlayer(player, this._pendingPlayerState);
            }
            this._pendingPlayerState = undefined;
        });
        bindSizeToPlayer(playerObs, this._width, this._height);
        bindSuggestedQualityToPlayer(playerObs, this._suggestedQuality);
        bindCueVideoCall(playerObs, this._videoId, this._startSeconds, this._endSeconds, this._suggestedQuality, this._destroyed);
        // After all of the subscriptions are set up, connect the observable.
        playerObs.connect();
    }
    /**
     * @deprecated No longer being used. To be removed.
     * @breaking-change 11.0.0
     */
    createEventsBoundInZone() {
        return {};
    }
    ngAfterViewInit() {
        this._youtubeContainer.next(this.youtubeContainer.nativeElement);
    }
    ngOnDestroy() {
        if (this._player) {
            this._player.destroy();
            window.onYouTubeIframeAPIReady = this._existingApiReadyCallback;
        }
        this._playerChanges.complete();
        this._videoId.complete();
        this._height.complete();
        this._width.complete();
        this._startSeconds.complete();
        this._endSeconds.complete();
        this._suggestedQuality.complete();
        this._youtubeContainer.complete();
        this._playerVars.complete();
        this._destroyed.next();
        this._destroyed.complete();
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#playVideo */
    playVideo() {
        if (this._player) {
            this._player.playVideo();
        }
        else {
            this._getPendingState().playbackState = YT.PlayerState.PLAYING;
        }
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#pauseVideo */
    pauseVideo() {
        if (this._player) {
            this._player.pauseVideo();
        }
        else {
            this._getPendingState().playbackState = YT.PlayerState.PAUSED;
        }
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#stopVideo */
    stopVideo() {
        if (this._player) {
            this._player.stopVideo();
        }
        else {
            // It seems like YouTube sets the player to CUED when it's stopped.
            this._getPendingState().playbackState = YT.PlayerState.CUED;
        }
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#seekTo */
    seekTo(seconds, allowSeekAhead) {
        if (this._player) {
            this._player.seekTo(seconds, allowSeekAhead);
        }
        else {
            this._getPendingState().seek = { seconds, allowSeekAhead };
        }
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#mute */
    mute() {
        if (this._player) {
            this._player.mute();
        }
        else {
            this._getPendingState().muted = true;
        }
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#unMute */
    unMute() {
        if (this._player) {
            this._player.unMute();
        }
        else {
            this._getPendingState().muted = false;
        }
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#isMuted */
    isMuted() {
        if (this._player) {
            return this._player.isMuted();
        }
        if (this._pendingPlayerState) {
            return !!this._pendingPlayerState.muted;
        }
        return false;
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#setVolume */
    setVolume(volume) {
        if (this._player) {
            this._player.setVolume(volume);
        }
        else {
            this._getPendingState().volume = volume;
        }
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getVolume */
    getVolume() {
        if (this._player) {
            return this._player.getVolume();
        }
        if (this._pendingPlayerState && this._pendingPlayerState.volume != null) {
            return this._pendingPlayerState.volume;
        }
        return 0;
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate */
    setPlaybackRate(playbackRate) {
        if (this._player) {
            return this._player.setPlaybackRate(playbackRate);
        }
        else {
            this._getPendingState().playbackRate = playbackRate;
        }
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getPlaybackRate */
    getPlaybackRate() {
        if (this._player) {
            return this._player.getPlaybackRate();
        }
        if (this._pendingPlayerState && this._pendingPlayerState.playbackRate != null) {
            return this._pendingPlayerState.playbackRate;
        }
        return 0;
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getAvailablePlaybackRates */
    getAvailablePlaybackRates() {
        return this._player ? this._player.getAvailablePlaybackRates() : [];
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getVideoLoadedFraction */
    getVideoLoadedFraction() {
        return this._player ? this._player.getVideoLoadedFraction() : 0;
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getPlayerState */
    getPlayerState() {
        if (!this._isBrowser || !window.YT) {
            return undefined;
        }
        if (this._player) {
            return this._player.getPlayerState();
        }
        if (this._pendingPlayerState && this._pendingPlayerState.playbackState != null) {
            return this._pendingPlayerState.playbackState;
        }
        return YT.PlayerState.UNSTARTED;
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getCurrentTime */
    getCurrentTime() {
        if (this._player) {
            return this._player.getCurrentTime();
        }
        if (this._pendingPlayerState && this._pendingPlayerState.seek) {
            return this._pendingPlayerState.seek.seconds;
        }
        return 0;
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getPlaybackQuality */
    getPlaybackQuality() {
        return this._player ? this._player.getPlaybackQuality() : 'default';
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getAvailableQualityLevels */
    getAvailableQualityLevels() {
        return this._player ? this._player.getAvailableQualityLevels() : [];
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getDuration */
    getDuration() {
        return this._player ? this._player.getDuration() : 0;
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getVideoUrl */
    getVideoUrl() {
        return this._player ? this._player.getVideoUrl() : '';
    }
    /** See https://developers.google.com/youtube/iframe_api_reference#getVideoEmbedCode */
    getVideoEmbedCode() {
        return this._player ? this._player.getVideoEmbedCode() : '';
    }
    /** Gets an object that should be used to store the temporary API state. */
    _getPendingState() {
        if (!this._pendingPlayerState) {
            this._pendingPlayerState = {};
        }
        return this._pendingPlayerState;
    }
    /** Initializes a player from a temporary state. */
    _initializePlayer(player, state) {
        const { playbackState, playbackRate, volume, muted, seek } = state;
        switch (playbackState) {
            case YT.PlayerState.PLAYING:
                player.playVideo();
                break;
            case YT.PlayerState.PAUSED:
                player.pauseVideo();
                break;
            case YT.PlayerState.CUED:
                player.stopVideo();
                break;
        }
        if (playbackRate != null) {
            player.setPlaybackRate(playbackRate);
        }
        if (volume != null) {
            player.setVolume(volume);
        }
        if (muted != null) {
            muted ? player.mute() : player.unMute();
        }
        if (seek != null) {
            player.seekTo(seek.seconds, seek.allowSeekAhead);
        }
    }
    /** Gets an observable that adds an event listener to the player when a user subscribes to it. */
    _getLazyEmitter(name) {
        // Start with the stream of players. This way the events will be transferred
        // over to the new player if it gets swapped out under-the-hood.
        return this._playerChanges.pipe(
        // Switch to the bound event. `switchMap` ensures that the old event is removed when the
        // player is changed. If there's no player, return an observable that never emits.
        switchMap(player => {
            return player ? fromEventPattern((listener) => {
                player.addEventListener(name, listener);
            }, (listener) => {
                // The API seems to throw when we try to unbind from a destroyed player and it doesn't
                // expose whether the player has been destroyed so we have to wrap it in a try/catch to
                // prevent the entire stream from erroring out.
                try {
                    if (player.removeEventListener) {
                        player.removeEventListener(name, listener);
                    }
                }
                catch (_a) { }
            }) : observableOf();
        }), 
        // By default we run all the API interactions outside the zone
        // so we have to bring the events back in manually when they emit.
        (source) => new Observable(observer => source.subscribe({
            next: value => this._ngZone.run(() => observer.next(value)),
            error: error => observer.error(error),
            complete: () => observer.complete()
        })), 
        // Ensures that everything is cleared out on destroy.
        takeUntil(this._destroyed));
    }
}
YouTubePlayer.decorators = [
    { type: Component, args: [{
                selector: 'youtube-player',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                // This div is *replaced* by the YouTube player embed.
                template: '<div #youtubeContainer></div>'
            },] }
];
YouTubePlayer.ctorParameters = () => [
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
YouTubePlayer.propDecorators = {
    videoId: [{ type: Input }],
    height: [{ type: Input }],
    width: [{ type: Input }],
    startSeconds: [{ type: Input }],
    endSeconds: [{ type: Input }],
    suggestedQuality: [{ type: Input }],
    playerVars: [{ type: Input }],
    showBeforeIframeApiLoads: [{ type: Input }],
    ready: [{ type: Output }],
    stateChange: [{ type: Output }],
    error: [{ type: Output }],
    apiChange: [{ type: Output }],
    playbackQualityChange: [{ type: Output }],
    playbackRateChange: [{ type: Output }],
    youtubeContainer: [{ type: ViewChild, args: ['youtubeContainer',] }]
};
/** Listens to changes to the given width and height and sets it on the player. */
function bindSizeToPlayer(playerObs, widthObs, heightObs) {
    return combineLatest([playerObs, widthObs, heightObs])
        .subscribe(([player, width, height]) => player && player.setSize(width, height));
}
/** Listens to changes from the suggested quality and sets it on the given player. */
function bindSuggestedQualityToPlayer(playerObs, suggestedQualityObs) {
    return combineLatest([
        playerObs,
        suggestedQualityObs
    ]).subscribe(([player, suggestedQuality]) => player && suggestedQuality && player.setPlaybackQuality(suggestedQuality));
}
/**
 * Returns an observable that emits the loaded player once it's ready. Certain properties/methods
 * won't be available until the iframe finishes loading.
 * @param onAbort Callback function that will be invoked if the player loading was aborted before
 * it was able to complete. Can be used to clean up any loose references.
 */
function waitUntilReady(onAbort) {
    return mergeMap(player => {
        if (!player) {
            return observableOf(undefined);
        }
        if (playerIsReady(player)) {
            return observableOf(player);
        }
        // Since removeEventListener is not on Player when it's initialized, we can't use fromEvent.
        // The player is not initialized fully until the ready is called.
        return new Observable(emitter => {
            let aborted = false;
            let resolved = false;
            const onReady = (event) => {
                resolved = true;
                if (!aborted) {
                    event.target.removeEventListener('onReady', onReady);
                    emitter.next(event.target);
                }
            };
            player.addEventListener('onReady', onReady);
            return () => {
                aborted = true;
                if (!resolved) {
                    onAbort(player);
                }
            };
        }).pipe(take(1), startWith(undefined));
    });
}
/** Create an observable for the player based on the given options. */
function createPlayerObservable(youtubeContainer, videoIdObs, iframeApiAvailableObs, widthObs, heightObs, playerVarsObs, ngZone) {
    const playerOptions = combineLatest([videoIdObs, playerVarsObs]).pipe(withLatestFrom(combineLatest([widthObs, heightObs])), map(([constructorOptions, sizeOptions]) => {
        const [videoId, playerVars] = constructorOptions;
        const [width, height] = sizeOptions;
        return videoId ? ({ videoId, playerVars, width, height }) : undefined;
    }));
    return combineLatest([youtubeContainer, playerOptions, of(ngZone)])
        .pipe(skipUntilRememberLatest(iframeApiAvailableObs), scan(syncPlayerState, undefined), distinctUntilChanged());
}
/** Skips the given observable until the other observable emits true, then emit the latest. */
function skipUntilRememberLatest(notifier) {
    return pipe(combineLatestOp(notifier), skipWhile(([_, doneSkipping]) => !doneSkipping), map(([value]) => value));
}
/** Destroy the player if there are no options, or create the player if there are options. */
function syncPlayerState(player, [container, videoOptions, ngZone]) {
    if (player && videoOptions && player.playerVars !== videoOptions.playerVars) {
        // The player needs to be recreated if the playerVars are different.
        player.destroy();
    }
    else if (!videoOptions) {
        if (player) {
            // Destroy the player if the videoId was removed.
            player.destroy();
        }
        return;
    }
    else if (player) {
        return player;
    }
    // Important! We need to create the Player object outside of the `NgZone`, because it kicks
    // off a 250ms setInterval which will continually trigger change detection if we don't.
    const newPlayer = ngZone.runOutsideAngular(() => new YT.Player(container, videoOptions));
    newPlayer.videoId = videoOptions.videoId;
    newPlayer.playerVars = videoOptions.playerVars;
    return newPlayer;
}
/**
 * Call cueVideoById if the videoId changes, or when start or end seconds change. cueVideoById will
 * change the loaded video id to the given videoId, and set the start and end times to the given
 * start/end seconds.
 */
function bindCueVideoCall(playerObs, videoIdObs, startSecondsObs, endSecondsObs, suggestedQualityObs, destroyed) {
    const cueOptionsObs = combineLatest([startSecondsObs, endSecondsObs])
        .pipe(map(([startSeconds, endSeconds]) => ({ startSeconds, endSeconds })));
    // Only respond to changes in cue options if the player is not running.
    const filteredCueOptions = cueOptionsObs
        .pipe(filterOnOther(playerObs, player => !!player && !hasPlayerStarted(player)));
    // If the video id changed, there's no reason to run 'cue' unless the player
    // was initialized with a different video id.
    const changedVideoId = videoIdObs
        .pipe(filterOnOther(playerObs, (player, videoId) => !!player && player.videoId !== videoId));
    // If the player changed, there's no reason to run 'cue' unless there are cue options.
    const changedPlayer = playerObs.pipe(filterOnOther(combineLatest([videoIdObs, cueOptionsObs]), ([videoId, cueOptions], player) => !!player &&
        (videoId != player.videoId || !!cueOptions.startSeconds || !!cueOptions.endSeconds)));
    merge(changedPlayer, changedVideoId, filteredCueOptions)
        .pipe(withLatestFrom(combineLatest([playerObs, videoIdObs, cueOptionsObs, suggestedQualityObs])), map(([_, values]) => values), takeUntil(destroyed))
        .subscribe(([player, videoId, cueOptions, suggestedQuality]) => {
        if (!videoId || !player) {
            return;
        }
        player.videoId = videoId;
        player.cueVideoById(Object.assign({ videoId,
            suggestedQuality }, cueOptions));
    });
}
function hasPlayerStarted(player) {
    const state = player.getPlayerState();
    return state !== YT.PlayerState.UNSTARTED && state !== YT.PlayerState.CUED;
}
function playerIsReady(player) {
    return 'getPlayerStatus' in player;
}
/** Combines the two observables temporarily for the filter function. */
function filterOnOther(otherObs, filterFn) {
    return pipe(withLatestFrom(otherObs), filter(([value, other]) => filterFn(other, value)), map(([value]) => value));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1wbGF5ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMveW91dHViZS1wbGF5ZXIveW91dHViZS1wbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgseUVBQXlFO0FBQ3pFLGlDQUFpQztBQUVqQyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEVBQ04sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRWxELE9BQU8sRUFDTCxhQUFhLEVBRWIsS0FBSyxFQUVMLFVBQVUsRUFDVixFQUFFLElBQUksWUFBWSxFQUVsQixJQUFJLEVBQ0osT0FBTyxFQUNQLEVBQUUsRUFDRixlQUFlLEVBQ2YsZ0JBQWdCLEdBQ2pCLE1BQU0sTUFBTSxDQUFDO0FBRWQsT0FBTyxFQUNMLGFBQWEsSUFBSSxlQUFlLEVBQ2hDLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILE9BQU8sRUFDUCxJQUFJLEVBQ0osU0FBUyxFQUNULFNBQVMsRUFDVCxJQUFJLEVBQ0osU0FBUyxFQUNULGNBQWMsRUFDZCxTQUFTLEVBQ1QsR0FBRyxFQUNILFFBQVEsR0FDVCxNQUFNLGdCQUFnQixDQUFDO0FBU3hCLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEdBQUcsQ0FBQztBQUN4QyxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLENBQUM7QUF5QnpDOzs7O0dBSUc7QUFRSCxNQUFNLE9BQU8sYUFBYTtJQWlHeEIsWUFBb0IsT0FBZSxFQUF1QixVQUFrQjtRQUF4RCxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBOUZsQixzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBZSxD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QixRQUF1QixFQUN2QixRQUFrQztJQUVsQyxPQUFPLElBQUksQ0FDVCxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQ3hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQ2xELEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUN4QixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBXb3JrYXJvdW5kIGZvcjogaHR0cHM6Ly9naXRodWIuY29tL2JhemVsYnVpbGQvcnVsZXNfbm9kZWpzL2lzc3Vlcy8xMjY1XG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInlvdXR1YmVcIiAvPlxuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBJbmplY3QsXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7XG4gIGNvbWJpbmVMYXRlc3QsXG4gIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSxcbiAgbWVyZ2UsXG4gIE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbixcbiAgT2JzZXJ2YWJsZSxcbiAgb2YgYXMgb2JzZXJ2YWJsZU9mLFxuICBPcGVyYXRvckZ1bmN0aW9uLFxuICBwaXBlLFxuICBTdWJqZWN0LFxuICBvZixcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBmcm9tRXZlbnRQYXR0ZXJuLFxufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgY29tYmluZUxhdGVzdCBhcyBjb21iaW5lTGF0ZXN0T3AsXG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcHVibGlzaCxcbiAgc2NhbixcbiAgc2tpcFdoaWxlLFxuICBzdGFydFdpdGgsXG4gIHRha2UsXG4gIHRha2VVbnRpbCxcbiAgd2l0aExhdGVzdEZyb20sXG4gIHN3aXRjaE1hcCxcbiAgdGFwLFxuICBtZXJnZU1hcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIFlUOiB0eXBlb2YgWVQgfCB1bmRlZmluZWQ7XG4gICAgb25Zb3VUdWJlSWZyYW1lQVBJUmVhZHk6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9QTEFZRVJfV0lEVEggPSA2NDA7XG5leHBvcnQgY29uc3QgREVGQVVMVF9QTEFZRVJfSEVJR0hUID0gMzkwO1xuXG4vLyBUaGUgbmF0aXZlIFlULlBsYXllciBkb2Vzbid0IGV4cG9zZSB0aGUgc2V0IHZpZGVvSWQsIGJ1dCB3ZSBuZWVkIGl0IGZvclxuLy8gY29udmVuaWVuY2UuXG5pbnRlcmZhY2UgUGxheWVyIGV4dGVuZHMgWVQuUGxheWVyIHtcbiAgdmlkZW9JZD86IHN0cmluZztcbiAgcGxheWVyVmFycz86IFlULlBsYXllclZhcnM7XG59XG5cbi8vIFRoZSBwbGF5ZXIgaXNuJ3QgZnVsbHkgaW5pdGlhbGl6ZWQgd2hlbiBpdCdzIGNvbnN0cnVjdGVkLlxuLy8gVGhlIG9ubHkgZmllbGQgYXZhaWxhYmxlIGlzIGRlc3Ryb3kgYW5kIGFkZEV2ZW50TGlzdGVuZXIuXG50eXBlIFVuaW5pdGlhbGl6ZWRQbGF5ZXIgPSBQaWNrPFBsYXllciwgJ3ZpZGVvSWQnIHwgJ3BsYXllclZhcnMnIHwgJ2Rlc3Ryb3knIHwgJ2FkZEV2ZW50TGlzdGVuZXInPjtcblxuLyoqXG4gKiBPYmplY3QgdXNlZCB0byBzdG9yZSB0aGUgc3RhdGUgb2YgdGhlIHBsYXllciBpZiB0aGVcbiAqIHVzZXIgdHJpZXMgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgQVBJIGJlZm9yZSBpdCBoYXMgYmVlbiBsb2FkZWQuXG4gKi9cbmludGVyZmFjZSBQZW5kaW5nUGxheWVyU3RhdGUge1xuICBwbGF5YmFja1N0YXRlPzogWVQuUGxheWVyU3RhdGUuUExBWUlORyB8IFlULlBsYXllclN0YXRlLlBBVVNFRCB8IFlULlBsYXllclN0YXRlLkNVRUQ7XG4gIHBsYXliYWNrUmF0ZT86IG51bWJlcjtcbiAgdm9sdW1lPzogbnVtYmVyO1xuICBtdXRlZD86IGJvb2xlYW47XG4gIHNlZWs/OiB7c2Vjb25kczogbnVtYmVyLCBhbGxvd1NlZWtBaGVhZDogYm9vbGVhbn07XG59XG5cbi8qKlxuICogQW5ndWxhciBjb21wb25lbnQgdGhhdCByZW5kZXJzIGEgWW91VHViZSBwbGF5ZXIgdmlhIHRoZSBZb3VUdWJlIHBsYXllclxuICogaWZyYW1lIEFQSS5cbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5b3V0dWJlLXBsYXllcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAvLyBUaGlzIGRpdiBpcyAqcmVwbGFjZWQqIGJ5IHRoZSBZb3VUdWJlIHBsYXllciBlbWJlZC5cbiAgdGVtcGxhdGU6ICc8ZGl2ICN5b3V0dWJlQ29udGFpbmVyPjwvZGl2PicsXG59KVxuZXhwb3J0IGNsYXNzIFlvdVR1YmVQbGF5ZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIC8qKiBXaGV0aGVyIHdlJ3JlIGN1cnJlbnRseSByZW5kZXJpbmcgaW5zaWRlIGEgYnJvd3Nlci4gKi9cbiAgcHJpdmF0ZSBfaXNCcm93c2VyOiBib29sZWFuO1xuICBwcml2YXRlIHJlYWRvbmx5IF95b3V0dWJlQ29udGFpbmVyID0gbmV3IFN1YmplY3Q8SFRNTEVsZW1lbnQ+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX3BsYXllcjogUGxheWVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9leGlzdGluZ0FwaVJlYWR5Q2FsbGJhY2s6ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfcGVuZGluZ1BsYXllclN0YXRlOiBQZW5kaW5nUGxheWVyU3RhdGUgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3BsYXllckNoYW5nZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFVuaW5pdGlhbGl6ZWRQbGF5ZXIgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbiAgLyoqIFlvdVR1YmUgVmlkZW8gSUQgdG8gdmlldyAqL1xuICBASW5wdXQoKVxuICBnZXQgdmlkZW9JZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fdmlkZW9JZC52YWx1ZTsgfVxuICBzZXQgdmlkZW9JZCh2aWRlb0lkOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl92aWRlb0lkLm5leHQodmlkZW9JZCk7XG4gIH1cbiAgcHJpdmF0ZSByZWFkb25seSBfdmlkZW9JZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG4gIC8qKiBIZWlnaHQgb2YgdmlkZW8gcGxheWVyICovXG4gIEBJbnB1dCgpXG4gIGdldCBoZWlnaHQoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX2hlaWdodC52YWx1ZTsgfVxuICBzZXQgaGVpZ2h0KGhlaWdodDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5faGVpZ2h0Lm5leHQoaGVpZ2h0IHx8IERFRkFVTFRfUExBWUVSX0hFSUdIVCk7XG4gIH1cbiAgcHJpdmF0ZSByZWFkb25seSBfaGVpZ2h0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KERFRkFVTFRfUExBWUVSX0hFSUdIVCk7XG5cbiAgLyoqIFdpZHRoIG9mIHZpZGVvIHBsYXllciAqL1xuICBASW5wdXQoKVxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX3dpZHRoLnZhbHVlOyB9XG4gIHNldCB3aWR0aCh3aWR0aDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fd2lkdGgubmV4dCh3aWR0aCB8fCBERUZBVUxUX1BMQVlFUl9XSURUSCk7XG4gIH1cbiAgcHJpdmF0ZSByZWFkb25seSBfd2lkdGggPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oREVGQVVMVF9QTEFZRVJfV0lEVEgpO1xuXG4gIC8qKiBUaGUgbW9tZW50IHdoZW4gdGhlIHBsYXllciBpcyBzdXBwb3NlZCB0byBzdGFydCBwbGF5aW5nICovXG4gIEBJbnB1dCgpXG4gIHNldCBzdGFydFNlY29uZHMoc3RhcnRTZWNvbmRzOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9zdGFydFNlY29uZHMubmV4dChzdGFydFNlY29uZHMpO1xuICB9XG4gIHByaXZhdGUgcmVhZG9ubHkgX3N0YXJ0U2Vjb25kcyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG4gIC8qKiBUaGUgbW9tZW50IHdoZW4gdGhlIHBsYXllciBpcyBzdXBwb3NlZCB0byBzdG9wIHBsYXlpbmcgKi9cbiAgQElucHV0KClcbiAgc2V0IGVuZFNlY29uZHMoZW5kU2Vjb25kczogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fZW5kU2Vjb25kcy5uZXh0KGVuZFNlY29uZHMpO1xuICB9XG4gIHByaXZhdGUgcmVhZG9ubHkgX2VuZFNlY29uZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlciB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuICAvKiogVGhlIHN1Z2dlc3RlZCBxdWFsaXR5IG9mIHRoZSBwbGF5ZXIgKi9cbiAgQElucHV0KClcbiAgc2V0IHN1Z2dlc3RlZFF1YWxpdHkoc3VnZ2VzdGVkUXVhbGl0eTogWVQuU3VnZ2VzdGVkVmlkZW9RdWFsaXR5IHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fc3VnZ2VzdGVkUXVhbGl0eS5uZXh0KHN1Z2dlc3RlZFF1YWxpdHkpO1xuICB9XG4gIHByaXZhdGUgcmVhZG9ubHkgX3N1Z2dlc3RlZFF1YWxpdHkgPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8WVQuU3VnZ2VzdGVkVmlkZW9RdWFsaXR5IHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG4gIC8qKlxuICAgKiBFeHRyYSBwYXJhbWV0ZXJzIHVzZWQgdG8gY29uZmlndXJlIHRoZSBwbGF5ZXIuIFNlZTpcbiAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9wbGF5ZXJfcGFyYW1ldGVycy5odG1sP3BsYXllclZlcnNpb249SFRNTDUjUGFyYW1ldGVyc1xuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHBsYXllclZhcnMoKTogWVQuUGxheWVyVmFycyB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl9wbGF5ZXJWYXJzLnZhbHVlOyB9XG4gIHNldCBwbGF5ZXJWYXJzKHBsYXllclZhcnM6IFlULlBsYXllclZhcnMgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9wbGF5ZXJWYXJzLm5leHQocGxheWVyVmFycyk7XG4gIH1cbiAgcHJpdmF0ZSBfcGxheWVyVmFycyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8WVQuUGxheWVyVmFycyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgaWZyYW1lIHdpbGwgYXR0ZW1wdCB0byBsb2FkIHJlZ2FyZGxlc3Mgb2YgdGhlIHN0YXR1cyBvZiB0aGUgYXBpIG9uIHRoZVxuICAgKiBwYWdlLiBTZXQgdGhpcyB0byB0cnVlIGlmIHlvdSBkb24ndCB3YW50IHRoZSBgb25Zb3VUdWJlSWZyYW1lQVBJUmVhZHlgIGZpZWxkIHRvIGJlXG4gICAqIHNldCBvbiB0aGUgZ2xvYmFsIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dCZWZvcmVJZnJhbWVBcGlMb2FkczogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAvKiogT3V0cHV0cyBhcmUgZGlyZWN0IHByb3hpZXMgZnJvbSB0aGUgcGxheWVyIGl0c2VsZi4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHJlYWR5OiBPYnNlcnZhYmxlPFlULlBsYXllckV2ZW50PiA9XG4gICAgICB0aGlzLl9nZXRMYXp5RW1pdHRlcjxZVC5QbGF5ZXJFdmVudD4oJ29uUmVhZHknKTtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgc3RhdGVDaGFuZ2U6IE9ic2VydmFibGU8WVQuT25TdGF0ZUNoYW5nZUV2ZW50PiA9XG4gICAgICB0aGlzLl9nZXRMYXp5RW1pdHRlcjxZVC5PblN0YXRlQ2hhbmdlRXZlbnQ+KCdvblN0YXRlQ2hhbmdlJyk7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGVycm9yOiBPYnNlcnZhYmxlPFlULk9uRXJyb3JFdmVudD4gPVxuICAgICAgdGhpcy5fZ2V0TGF6eUVtaXR0ZXI8WVQuT25FcnJvckV2ZW50Pignb25FcnJvcicpO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBhcGlDaGFuZ2U6IE9ic2VydmFibGU8WVQuUGxheWVyRXZlbnQ+ID1cbiAgICAgIHRoaXMuX2dldExhenlFbWl0dGVyPFlULlBsYXllckV2ZW50Pignb25BcGlDaGFuZ2UnKTtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgcGxheWJhY2tRdWFsaXR5Q2hhbmdlOiBPYnNlcnZhYmxlPFlULk9uUGxheWJhY2tRdWFsaXR5Q2hhbmdlRXZlbnQ+ID1cbiAgICAgIHRoaXMuX2dldExhenlFbWl0dGVyPFlULk9uUGxheWJhY2tRdWFsaXR5Q2hhbmdlRXZlbnQ+KCdvblBsYXliYWNrUXVhbGl0eUNoYW5nZScpO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBwbGF5YmFja1JhdGVDaGFuZ2U6IE9ic2VydmFibGU8WVQuT25QbGF5YmFja1JhdGVDaGFuZ2VFdmVudD4gPVxuICAgICAgdGhpcy5fZ2V0TGF6eUVtaXR0ZXI8WVQuT25QbGF5YmFja1JhdGVDaGFuZ2VFdmVudD4oJ29uUGxheWJhY2tSYXRlQ2hhbmdlJyk7XG5cbiAgLyoqIFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgaWZyYW1lLiAqL1xuICBAVmlld0NoaWxkKCd5b3V0dWJlQ29udGFpbmVyJylcbiAgeW91dHViZUNvbnRhaW5lcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCkge1xuICAgIHRoaXMuX2lzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgd2UncmUgbm90IGluIGEgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICBpZiAoIXRoaXMuX2lzQnJvd3Nlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpZnJhbWVBcGlBdmFpbGFibGVPYnM6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBvYnNlcnZhYmxlT2YodHJ1ZSk7XG4gICAgaWYgKCF3aW5kb3cuWVQgfHwgIXdpbmRvdy5ZVC5QbGF5ZXIpIHtcbiAgICAgIGlmICh0aGlzLnNob3dCZWZvcmVJZnJhbWVBcGlMb2FkcyAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWVzcGFjZSBZVCBub3QgZm91bmQsIGNhbm5vdCBjb25zdHJ1Y3QgZW1iZWRkZWQgeW91dHViZSBwbGF5ZXIuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSBpbnN0YWxsIHRoZSBZb3VUdWJlIFBsYXllciBBUEkgUmVmZXJlbmNlIGZvciBpZnJhbWUgRW1iZWRzOiAnICtcbiAgICAgICAgICAgICdodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlmcmFtZUFwaUF2YWlsYWJsZVN1YmplY3QgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgICAgdGhpcy5fZXhpc3RpbmdBcGlSZWFkeUNhbGxiYWNrID0gd2luZG93Lm9uWW91VHViZUlmcmFtZUFQSVJlYWR5O1xuXG4gICAgICB3aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9leGlzdGluZ0FwaVJlYWR5Q2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLl9leGlzdGluZ0FwaVJlYWR5Q2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IGlmcmFtZUFwaUF2YWlsYWJsZVN1YmplY3QubmV4dCh0cnVlKSk7XG4gICAgICB9O1xuICAgICAgaWZyYW1lQXBpQXZhaWxhYmxlT2JzID0gaWZyYW1lQXBpQXZhaWxhYmxlU3ViamVjdC5waXBlKHRha2UoMSksIHN0YXJ0V2l0aChmYWxzZSkpO1xuICAgIH1cblxuICAgIC8vIEFuIG9ic2VydmFibGUgb2YgdGhlIGN1cnJlbnRseSBsb2FkZWQgcGxheWVyLlxuICAgIGNvbnN0IHBsYXllck9icyA9XG4gICAgICBjcmVhdGVQbGF5ZXJPYnNlcnZhYmxlKFxuICAgICAgICB0aGlzLl95b3V0dWJlQ29udGFpbmVyLFxuICAgICAgICB0aGlzLl92aWRlb0lkLFxuICAgICAgICBpZnJhbWVBcGlBdmFpbGFibGVPYnMsXG4gICAgICAgIHRoaXMuX3dpZHRoLFxuICAgICAgICB0aGlzLl9oZWlnaHQsXG4gICAgICAgIHRoaXMuX3BsYXllclZhcnMsXG4gICAgICAgIHRoaXMuX25nWm9uZVxuICAgICAgKS5waXBlKHRhcChwbGF5ZXIgPT4ge1xuICAgICAgICAvLyBFbWl0IHRoaXMgYmVmb3JlIHRoZSBgd2FpdFVudGlsUmVhZHlgIGNhbGwgc28gdGhhdCB3ZSBjYW4gYmluZCB0b1xuICAgICAgICAvLyBldmVudHMgdGhhdCBoYXBwZW4gYXMgdGhlIHBsYXllciBpcyBiZWluZyBpbml0aWFsaXplZCAoZS5nLiBgb25SZWFkeWApLlxuICAgICAgICB0aGlzLl9wbGF5ZXJDaGFuZ2VzLm5leHQocGxheWVyKTtcbiAgICAgIH0pLCB3YWl0VW50aWxSZWFkeShwbGF5ZXIgPT4ge1xuICAgICAgICAvLyBEZXN0cm95IHRoZSBwbGF5ZXIgaWYgbG9hZGluZyB3YXMgYWJvcnRlZCBzbyB0aGF0IHdlIGRvbid0IGVuZCB1cCBsZWFraW5nIG1lbW9yeS5cbiAgICAgICAgaWYgKCFwbGF5ZXJJc1JlYWR5KHBsYXllcikpIHtcbiAgICAgICAgICBwbGF5ZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9KSwgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3llZCksIHB1Ymxpc2goKSk7XG5cbiAgICAvLyBTZXQgdXAgc2lkZSBlZmZlY3RzIHRvIGJpbmQgaW5wdXRzIHRvIHRoZSBwbGF5ZXIuXG4gICAgcGxheWVyT2JzLnN1YnNjcmliZShwbGF5ZXIgPT4ge1xuICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuXG4gICAgICBpZiAocGxheWVyICYmIHRoaXMuX3BlbmRpbmdQbGF5ZXJTdGF0ZSkge1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplUGxheWVyKHBsYXllciwgdGhpcy5fcGVuZGluZ1BsYXllclN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcGVuZGluZ1BsYXllclN0YXRlID0gdW5kZWZpbmVkO1xuICAgIH0pO1xuXG4gICAgYmluZFNpemVUb1BsYXllcihwbGF5ZXJPYnMsIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuXG4gICAgYmluZFN1Z2dlc3RlZFF1YWxpdHlUb1BsYXllcihwbGF5ZXJPYnMsIHRoaXMuX3N1Z2dlc3RlZFF1YWxpdHkpO1xuXG4gICAgYmluZEN1ZVZpZGVvQ2FsbChcbiAgICAgIHBsYXllck9icyxcbiAgICAgIHRoaXMuX3ZpZGVvSWQsXG4gICAgICB0aGlzLl9zdGFydFNlY29uZHMsXG4gICAgICB0aGlzLl9lbmRTZWNvbmRzLFxuICAgICAgdGhpcy5fc3VnZ2VzdGVkUXVhbGl0eSxcbiAgICAgIHRoaXMuX2Rlc3Ryb3llZCk7XG5cbiAgICAvLyBBZnRlciBhbGwgb2YgdGhlIHN1YnNjcmlwdGlvbnMgYXJlIHNldCB1cCwgY29ubmVjdCB0aGUgb2JzZXJ2YWJsZS5cbiAgICAocGxheWVyT2JzIGFzIENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxQbGF5ZXI+KS5jb25uZWN0KCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgTm8gbG9uZ2VyIGJlaW5nIHVzZWQuIFRvIGJlIHJlbW92ZWQuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTEuMC4wXG4gICAqL1xuICBjcmVhdGVFdmVudHNCb3VuZEluWm9uZSgpOiBZVC5FdmVudHMge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl95b3V0dWJlQ29udGFpbmVyLm5leHQodGhpcy55b3V0dWJlQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllcikge1xuICAgICAgdGhpcy5fcGxheWVyLmRlc3Ryb3koKTtcbiAgICAgIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IHRoaXMuX2V4aXN0aW5nQXBpUmVhZHlDYWxsYmFjaztcbiAgICB9XG5cbiAgICB0aGlzLl9wbGF5ZXJDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fdmlkZW9JZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2hlaWdodC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3dpZHRoLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fc3RhcnRTZWNvbmRzLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZW5kU2Vjb25kcy5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3N1Z2dlc3RlZFF1YWxpdHkuY29tcGxldGUoKTtcbiAgICB0aGlzLl95b3V0dWJlQ29udGFpbmVyLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fcGxheWVyVmFycy5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvaWZyYW1lX2FwaV9yZWZlcmVuY2UjcGxheVZpZGVvICovXG4gIHBsYXlWaWRlbygpIHtcbiAgICBpZiAodGhpcy5fcGxheWVyKSB7XG4gICAgICB0aGlzLl9wbGF5ZXIucGxheVZpZGVvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2dldFBlbmRpbmdTdGF0ZSgpLnBsYXliYWNrU3RhdGUgPSBZVC5QbGF5ZXJTdGF0ZS5QTEFZSU5HO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNwYXVzZVZpZGVvICovXG4gIHBhdXNlVmlkZW8oKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllcikge1xuICAgICAgdGhpcy5fcGxheWVyLnBhdXNlVmlkZW8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ2V0UGVuZGluZ1N0YXRlKCkucGxheWJhY2tTdGF0ZSA9IFlULlBsYXllclN0YXRlLlBBVVNFRDtcbiAgICB9XG4gIH1cblxuICAvKiogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvaWZyYW1lX2FwaV9yZWZlcmVuY2Ujc3RvcFZpZGVvICovXG4gIHN0b3BWaWRlbygpIHtcbiAgICBpZiAodGhpcy5fcGxheWVyKSB7XG4gICAgICB0aGlzLl9wbGF5ZXIuc3RvcFZpZGVvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEl0IHNlZW1zIGxpa2UgWW91VHViZSBzZXRzIHRoZSBwbGF5ZXIgdG8gQ1VFRCB3aGVuIGl0J3Mgc3RvcHBlZC5cbiAgICAgIHRoaXMuX2dldFBlbmRpbmdTdGF0ZSgpLnBsYXliYWNrU3RhdGUgPSBZVC5QbGF5ZXJTdGF0ZS5DVUVEO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNzZWVrVG8gKi9cbiAgc2Vla1RvKHNlY29uZHM6IG51bWJlciwgYWxsb3dTZWVrQWhlYWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fcGxheWVyKSB7XG4gICAgICB0aGlzLl9wbGF5ZXIuc2Vla1RvKHNlY29uZHMsIGFsbG93U2Vla0FoZWFkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ2V0UGVuZGluZ1N0YXRlKCkuc2VlayA9IHtzZWNvbmRzLCBhbGxvd1NlZWtBaGVhZH07XG4gICAgfVxuICB9XG5cbiAgLyoqIFNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlI211dGUgKi9cbiAgbXV0ZSgpIHtcbiAgICBpZiAodGhpcy5fcGxheWVyKSB7XG4gICAgICB0aGlzLl9wbGF5ZXIubXV0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nZXRQZW5kaW5nU3RhdGUoKS5tdXRlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlI3VuTXV0ZSAqL1xuICB1bk11dGUoKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllcikge1xuICAgICAgdGhpcy5fcGxheWVyLnVuTXV0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nZXRQZW5kaW5nU3RhdGUoKS5tdXRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNpc011dGVkICovXG4gIGlzTXV0ZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX3BsYXllcikge1xuICAgICAgcmV0dXJuIHRoaXMuX3BsYXllci5pc011dGVkKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BlbmRpbmdQbGF5ZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuICEhdGhpcy5fcGVuZGluZ1BsYXllclN0YXRlLm11dGVkO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNzZXRWb2x1bWUgKi9cbiAgc2V0Vm9sdW1lKHZvbHVtZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllcikge1xuICAgICAgdGhpcy5fcGxheWVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nZXRQZW5kaW5nU3RhdGUoKS52b2x1bWUgPSB2b2x1bWU7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlI2dldFZvbHVtZSAqL1xuICBnZXRWb2x1bWUoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fcGxheWVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGxheWVyLmdldFZvbHVtZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wZW5kaW5nUGxheWVyU3RhdGUgJiYgdGhpcy5fcGVuZGluZ1BsYXllclN0YXRlLnZvbHVtZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGVuZGluZ1BsYXllclN0YXRlLnZvbHVtZTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8qKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNzZXRQbGF5YmFja1JhdGUgKi9cbiAgc2V0UGxheWJhY2tSYXRlKHBsYXliYWNrUmF0ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllcikge1xuICAgICAgcmV0dXJuIHRoaXMuX3BsYXllci5zZXRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZ2V0UGVuZGluZ1N0YXRlKCkucGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNnZXRQbGF5YmFja1JhdGUgKi9cbiAgZ2V0UGxheWJhY2tSYXRlKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX3BsYXllcikge1xuICAgICAgcmV0dXJuIHRoaXMuX3BsYXllci5nZXRQbGF5YmFja1JhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGVuZGluZ1BsYXllclN0YXRlICYmIHRoaXMuX3BlbmRpbmdQbGF5ZXJTdGF0ZS5wbGF5YmFja1JhdGUgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3BlbmRpbmdQbGF5ZXJTdGF0ZS5wbGF5YmFja1JhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvKiogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvaWZyYW1lX2FwaV9yZWZlcmVuY2UjZ2V0QXZhaWxhYmxlUGxheWJhY2tSYXRlcyAqL1xuICBnZXRBdmFpbGFibGVQbGF5YmFja1JhdGVzKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gdGhpcy5fcGxheWVyID8gdGhpcy5fcGxheWVyLmdldEF2YWlsYWJsZVBsYXliYWNrUmF0ZXMoKSA6IFtdO1xuICB9XG5cbiAgLyoqIFNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlI2dldFZpZGVvTG9hZGVkRnJhY3Rpb24gKi9cbiAgZ2V0VmlkZW9Mb2FkZWRGcmFjdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wbGF5ZXIgPyB0aGlzLl9wbGF5ZXIuZ2V0VmlkZW9Mb2FkZWRGcmFjdGlvbigpIDogMDtcbiAgfVxuXG4gIC8qKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNnZXRQbGF5ZXJTdGF0ZSAqL1xuICBnZXRQbGF5ZXJTdGF0ZSgpOiBZVC5QbGF5ZXJTdGF0ZSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF0aGlzLl9pc0Jyb3dzZXIgfHwgIXdpbmRvdy5ZVCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGxheWVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGxheWVyLmdldFBsYXllclN0YXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BlbmRpbmdQbGF5ZXJTdGF0ZSAmJiB0aGlzLl9wZW5kaW5nUGxheWVyU3RhdGUucGxheWJhY2tTdGF0ZSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGVuZGluZ1BsYXllclN0YXRlLnBsYXliYWNrU3RhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIFlULlBsYXllclN0YXRlLlVOU1RBUlRFRDtcbiAgfVxuXG4gIC8qKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNnZXRDdXJyZW50VGltZSAqL1xuICBnZXRDdXJyZW50VGltZSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGVuZGluZ1BsYXllclN0YXRlICYmIHRoaXMuX3BlbmRpbmdQbGF5ZXJTdGF0ZS5zZWVrKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGVuZGluZ1BsYXllclN0YXRlLnNlZWsuc2Vjb25kcztcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8qKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNnZXRQbGF5YmFja1F1YWxpdHkgKi9cbiAgZ2V0UGxheWJhY2tRdWFsaXR5KCk6IFlULlN1Z2dlc3RlZFZpZGVvUXVhbGl0eSB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYXllciA/IHRoaXMuX3BsYXllci5nZXRQbGF5YmFja1F1YWxpdHkoKSA6ICdkZWZhdWx0JztcbiAgfVxuXG4gIC8qKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZSNnZXRBdmFpbGFibGVRdWFsaXR5TGV2ZWxzICovXG4gIGdldEF2YWlsYWJsZVF1YWxpdHlMZXZlbHMoKTogWVQuU3VnZ2VzdGVkVmlkZW9RdWFsaXR5W10ge1xuICAgIHJldHVybiB0aGlzLl9wbGF5ZXIgPyB0aGlzLl9wbGF5ZXIuZ2V0QXZhaWxhYmxlUXVhbGl0eUxldmVscygpIDogW107XG4gIH1cblxuICAvKiogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvaWZyYW1lX2FwaV9yZWZlcmVuY2UjZ2V0RHVyYXRpb24gKi9cbiAgZ2V0RHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGxheWVyID8gdGhpcy5fcGxheWVyLmdldER1cmF0aW9uKCkgOiAwO1xuICB9XG5cbiAgLyoqIFNlZSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlI2dldFZpZGVvVXJsICovXG4gIGdldFZpZGVvVXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYXllciA/IHRoaXMuX3BsYXllci5nZXRWaWRlb1VybCgpIDogJyc7XG4gIH1cblxuICAvKiogU2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3lvdXR1YmUvaWZyYW1lX2FwaV9yZWZlcmVuY2UjZ2V0VmlkZW9FbWJlZENvZGUgKi9cbiAgZ2V0VmlkZW9FbWJlZENvZGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcGxheWVyID8gdGhpcy5fcGxheWVyLmdldFZpZGVvRW1iZWRDb2RlKCkgOiAnJztcbiAgfVxuXG4gIC8qKiBHZXRzIGFuIG9iamVjdCB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIHN0b3JlIHRoZSB0ZW1wb3JhcnkgQVBJIHN0YXRlLiAqL1xuICBwcml2YXRlIF9nZXRQZW5kaW5nU3RhdGUoKTogUGVuZGluZ1BsYXllclN0YXRlIHtcbiAgICBpZiAoIXRoaXMuX3BlbmRpbmdQbGF5ZXJTdGF0ZSkge1xuICAgICAgdGhpcy5fcGVuZGluZ1BsYXllclN0YXRlID0ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3BlbmRpbmdQbGF5ZXJTdGF0ZTtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaXplcyBhIHBsYXllciBmcm9tIGEgdGVtcG9yYXJ5IHN0YXRlLiAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplUGxheWVyKHBsYXllcjogWVQuUGxheWVyLCBzdGF0ZTogUGVuZGluZ1BsYXllclN0YXRlKTogdm9pZCB7XG4gICAgY29uc3Qge3BsYXliYWNrU3RhdGUsIHBsYXliYWNrUmF0ZSwgdm9sdW1lLCBtdXRlZCwgc2Vla30gPSBzdGF0ZTtcblxuICAgIHN3aXRjaCAocGxheWJhY2tTdGF0ZSkge1xuICAgICAgY2FzZSBZVC5QbGF5ZXJTdGF0ZS5QTEFZSU5HOiBwbGF5ZXIucGxheVZpZGVvKCk7IGJyZWFrO1xuICAgICAgY2FzZSBZVC5QbGF5ZXJTdGF0ZS5QQVVTRUQ6IHBsYXllci5wYXVzZVZpZGVvKCk7IGJyZWFrO1xuICAgICAgY2FzZSBZVC5QbGF5ZXJTdGF0ZS5DVUVEOiBwbGF5ZXIuc3RvcFZpZGVvKCk7IGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChwbGF5YmFja1JhdGUgIT0gbnVsbCkge1xuICAgICAgcGxheWVyLnNldFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpO1xuICAgIH1cblxuICAgIGlmICh2b2x1bWUgIT0gbnVsbCkge1xuICAgICAgcGxheWVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIH1cblxuICAgIGlmIChtdXRlZCAhPSBudWxsKSB7XG4gICAgICBtdXRlZCA/IHBsYXllci5tdXRlKCkgOiBwbGF5ZXIudW5NdXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHNlZWsgIT0gbnVsbCkge1xuICAgICAgcGxheWVyLnNlZWtUbyhzZWVrLnNlY29uZHMsIHNlZWsuYWxsb3dTZWVrQWhlYWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBhZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBwbGF5ZXIgd2hlbiBhIHVzZXIgc3Vic2NyaWJlcyB0byBpdC4gKi9cbiAgcHJpdmF0ZSBfZ2V0TGF6eUVtaXR0ZXI8VCBleHRlbmRzIFlULlBsYXllckV2ZW50PihuYW1lOiBrZXlvZiBZVC5FdmVudHMpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAvLyBTdGFydCB3aXRoIHRoZSBzdHJlYW0gb2YgcGxheWVycy4gVGhpcyB3YXkgdGhlIGV2ZW50cyB3aWxsIGJlIHRyYW5zZmVycmVkXG4gICAgLy8gb3ZlciB0byB0aGUgbmV3IHBsYXllciBpZiBpdCBnZXRzIHN3YXBwZWQgb3V0IHVuZGVyLXRoZS1ob29kLlxuICAgIHJldHVybiB0aGlzLl9wbGF5ZXJDaGFuZ2VzLnBpcGUoXG4gICAgICAvLyBTd2l0Y2ggdG8gdGhlIGJvdW5kIGV2ZW50LiBgc3dpdGNoTWFwYCBlbnN1cmVzIHRoYXQgdGhlIG9sZCBldmVudCBpcyByZW1vdmVkIHdoZW4gdGhlXG4gICAgICAvLyBwbGF5ZXIgaXMgY2hhbmdlZC4gSWYgdGhlcmUncyBubyBwbGF5ZXIsIHJldHVybiBhbiBvYnNlcnZhYmxlIHRoYXQgbmV2ZXIgZW1pdHMuXG4gICAgICBzd2l0Y2hNYXAocGxheWVyID0+IHtcbiAgICAgICAgcmV0dXJuIHBsYXllciA/IGZyb21FdmVudFBhdHRlcm48VD4oKGxpc3RlbmVyOiAoZXZlbnQ6IFQpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICBwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgIH0sIChsaXN0ZW5lcjogKGV2ZW50OiBUKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgICAgLy8gVGhlIEFQSSBzZWVtcyB0byB0aHJvdyB3aGVuIHdlIHRyeSB0byB1bmJpbmQgZnJvbSBhIGRlc3Ryb3llZCBwbGF5ZXIgYW5kIGl0IGRvZXNuJ3RcbiAgICAgICAgICAvLyBleHBvc2Ugd2hldGhlciB0aGUgcGxheWVyIGhhcyBiZWVuIGRlc3Ryb3llZCBzbyB3ZSBoYXZlIHRvIHdyYXAgaXQgaW4gYSB0cnkvY2F0Y2ggdG9cbiAgICAgICAgICAvLyBwcmV2ZW50IHRoZSBlbnRpcmUgc3RyZWFtIGZyb20gZXJyb3Jpbmcgb3V0LlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoKHBsYXllciBhcyBQbGF5ZXIpLnJlbW92ZUV2ZW50TGlzdGVuZXIhKSB7XG4gICAgICAgICAgICAgIChwbGF5ZXIgYXMgUGxheWVyKS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIHt9XG4gICAgICAgIH0pIDogb2JzZXJ2YWJsZU9mPFQ+KCk7XG4gICAgICB9KSxcbiAgICAgIC8vIEJ5IGRlZmF1bHQgd2UgcnVuIGFsbCB0aGUgQVBJIGludGVyYWN0aW9ucyBvdXRzaWRlIHRoZSB6b25lXG4gICAgICAvLyBzbyB3ZSBoYXZlIHRvIGJyaW5nIHRoZSBldmVudHMgYmFjayBpbiBtYW51YWxseSB3aGVuIHRoZXkgZW1pdC5cbiAgICAgIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IG5ldyBPYnNlcnZhYmxlPFQ+KG9ic2VydmVyID0+IHNvdXJjZS5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiB2YWx1ZSA9PiB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQodmFsdWUpKSxcbiAgICAgICAgZXJyb3I6IGVycm9yID0+IG9ic2VydmVyLmVycm9yKGVycm9yKSxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IG9ic2VydmVyLmNvbXBsZXRlKClcbiAgICAgIH0pKSxcbiAgICAgIC8vIEVuc3VyZXMgdGhhdCBldmVyeXRoaW5nIGlzIGNsZWFyZWQgb3V0IG9uIGRlc3Ryb3kuXG4gICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKVxuICAgICk7XG4gIH1cbn1cblxuLyoqIExpc3RlbnMgdG8gY2hhbmdlcyB0byB0aGUgZ2l2ZW4gd2lkdGggYW5kIGhlaWdodCBhbmQgc2V0cyBpdCBvbiB0aGUgcGxheWVyLiAqL1xuZnVuY3Rpb24gYmluZFNpemVUb1BsYXllcihcbiAgcGxheWVyT2JzOiBPYnNlcnZhYmxlPFlULlBsYXllciB8IHVuZGVmaW5lZD4sXG4gIHdpZHRoT2JzOiBPYnNlcnZhYmxlPG51bWJlcj4sXG4gIGhlaWdodE9iczogT2JzZXJ2YWJsZTxudW1iZXI+XG4pIHtcbiAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW3BsYXllck9icywgd2lkdGhPYnMsIGhlaWdodE9ic10pXG4gICAgICAuc3Vic2NyaWJlKChbcGxheWVyLCB3aWR0aCwgaGVpZ2h0XSkgPT4gcGxheWVyICYmIHBsYXllci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpKTtcbn1cblxuLyoqIExpc3RlbnMgdG8gY2hhbmdlcyBmcm9tIHRoZSBzdWdnZXN0ZWQgcXVhbGl0eSBhbmQgc2V0cyBpdCBvbiB0aGUgZ2l2ZW4gcGxheWVyLiAqL1xuZnVuY3Rpb24gYmluZFN1Z2dlc3RlZFF1YWxpdHlUb1BsYXllcihcbiAgcGxheWVyT2JzOiBPYnNlcnZhYmxlPFlULlBsYXllciB8IHVuZGVmaW5lZD4sXG4gIHN1Z2dlc3RlZFF1YWxpdHlPYnM6IE9ic2VydmFibGU8WVQuU3VnZ2VzdGVkVmlkZW9RdWFsaXR5IHwgdW5kZWZpbmVkPlxuKSB7XG4gIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICBwbGF5ZXJPYnMsXG4gICAgc3VnZ2VzdGVkUXVhbGl0eU9ic1xuICBdKS5zdWJzY3JpYmUoXG4gICAgKFtwbGF5ZXIsIHN1Z2dlc3RlZFF1YWxpdHldKSA9PlxuICAgICAgICBwbGF5ZXIgJiYgc3VnZ2VzdGVkUXVhbGl0eSAmJiBwbGF5ZXIuc2V0UGxheWJhY2tRdWFsaXR5KHN1Z2dlc3RlZFF1YWxpdHkpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgbG9hZGVkIHBsYXllciBvbmNlIGl0J3MgcmVhZHkuIENlcnRhaW4gcHJvcGVydGllcy9tZXRob2RzXG4gKiB3b24ndCBiZSBhdmFpbGFibGUgdW50aWwgdGhlIGlmcmFtZSBmaW5pc2hlcyBsb2FkaW5nLlxuICogQHBhcmFtIG9uQWJvcnQgQ2FsbGJhY2sgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGludm9rZWQgaWYgdGhlIHBsYXllciBsb2FkaW5nIHdhcyBhYm9ydGVkIGJlZm9yZVxuICogaXQgd2FzIGFibGUgdG8gY29tcGxldGUuIENhbiBiZSB1c2VkIHRvIGNsZWFuIHVwIGFueSBsb29zZSByZWZlcmVuY2VzLlxuICovXG5mdW5jdGlvbiB3YWl0VW50aWxSZWFkeShvbkFib3J0OiAocGxheWVyOiBVbmluaXRpYWxpemVkUGxheWVyKSA9PiB2b2lkKTpcbiAgT3BlcmF0b3JGdW5jdGlvbjxVbmluaXRpYWxpemVkUGxheWVyIHwgdW5kZWZpbmVkLCBQbGF5ZXIgfCB1bmRlZmluZWQ+IHtcbiAgcmV0dXJuIG1lcmdlTWFwKHBsYXllciA9PiB7XG4gICAgaWYgKCFwbGF5ZXIpIHtcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlT2Y8UGxheWVyfHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICB9XG4gICAgaWYgKHBsYXllcklzUmVhZHkocGxheWVyKSkge1xuICAgICAgcmV0dXJuIG9ic2VydmFibGVPZihwbGF5ZXIgYXMgUGxheWVyKTtcbiAgICB9XG5cbiAgICAvLyBTaW5jZSByZW1vdmVFdmVudExpc3RlbmVyIGlzIG5vdCBvbiBQbGF5ZXIgd2hlbiBpdCdzIGluaXRpYWxpemVkLCB3ZSBjYW4ndCB1c2UgZnJvbUV2ZW50LlxuICAgIC8vIFRoZSBwbGF5ZXIgaXMgbm90IGluaXRpYWxpemVkIGZ1bGx5IHVudGlsIHRoZSByZWFkeSBpcyBjYWxsZWQuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFBsYXllcj4oZW1pdHRlciA9PiB7XG4gICAgICBsZXQgYWJvcnRlZCA9IGZhbHNlO1xuICAgICAgbGV0IHJlc29sdmVkID0gZmFsc2U7XG4gICAgICBjb25zdCBvblJlYWR5ID0gKGV2ZW50OiBZVC5QbGF5ZXJFdmVudCkgPT4ge1xuICAgICAgICByZXNvbHZlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29uUmVhZHknLCBvblJlYWR5KTtcbiAgICAgICAgICBlbWl0dGVyLm5leHQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ29uUmVhZHknLCBvblJlYWR5KTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKCFyZXNvbHZlZCkge1xuICAgICAgICAgIG9uQWJvcnQocGxheWVyKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KS5waXBlKHRha2UoMSksIHN0YXJ0V2l0aCh1bmRlZmluZWQpKTtcbiAgfSk7XG59XG5cbi8qKiBDcmVhdGUgYW4gb2JzZXJ2YWJsZSBmb3IgdGhlIHBsYXllciBiYXNlZCBvbiB0aGUgZ2l2ZW4gb3B0aW9ucy4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllck9ic2VydmFibGUoXG4gIHlvdXR1YmVDb250YWluZXI6IE9ic2VydmFibGU8SFRNTEVsZW1lbnQ+LFxuICB2aWRlb0lkT2JzOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4sXG4gIGlmcmFtZUFwaUF2YWlsYWJsZU9iczogT2JzZXJ2YWJsZTxib29sZWFuPixcbiAgd2lkdGhPYnM6IE9ic2VydmFibGU8bnVtYmVyPixcbiAgaGVpZ2h0T2JzOiBPYnNlcnZhYmxlPG51bWJlcj4sXG4gIHBsYXllclZhcnNPYnM6IE9ic2VydmFibGU8WVQuUGxheWVyVmFycyB8IHVuZGVmaW5lZD4sXG4gIG5nWm9uZTogTmdab25lXG4pOiBPYnNlcnZhYmxlPFVuaW5pdGlhbGl6ZWRQbGF5ZXIgfCB1bmRlZmluZWQ+IHtcblxuICBjb25zdCBwbGF5ZXJPcHRpb25zID0gY29tYmluZUxhdGVzdChbdmlkZW9JZE9icywgcGxheWVyVmFyc09ic10pLnBpcGUoXG4gICAgd2l0aExhdGVzdEZyb20oY29tYmluZUxhdGVzdChbd2lkdGhPYnMsIGhlaWdodE9ic10pKSxcbiAgICBtYXAoKFtjb25zdHJ1Y3Rvck9wdGlvbnMsIHNpemVPcHRpb25zXSkgPT4ge1xuICAgICAgY29uc3QgW3ZpZGVvSWQsIHBsYXllclZhcnNdID0gY29uc3RydWN0b3JPcHRpb25zO1xuICAgICAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gc2l6ZU9wdGlvbnM7XG4gICAgICByZXR1cm4gdmlkZW9JZCA/ICh7IHZpZGVvSWQsIHBsYXllclZhcnMsIHdpZHRoLCBoZWlnaHQgfSkgOiB1bmRlZmluZWQ7XG4gICAgfSksXG4gICk7XG5cbiAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW3lvdXR1YmVDb250YWluZXIsIHBsYXllck9wdGlvbnMsIG9mKG5nWm9uZSldKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHNraXBVbnRpbFJlbWVtYmVyTGF0ZXN0KGlmcmFtZUFwaUF2YWlsYWJsZU9icyksXG4gICAgICAgIHNjYW4oc3luY1BsYXllclN0YXRlLCB1bmRlZmluZWQpLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbn1cblxuLyoqIFNraXBzIHRoZSBnaXZlbiBvYnNlcnZhYmxlIHVudGlsIHRoZSBvdGhlciBvYnNlcnZhYmxlIGVtaXRzIHRydWUsIHRoZW4gZW1pdCB0aGUgbGF0ZXN0LiAqL1xuZnVuY3Rpb24gc2tpcFVudGlsUmVtZW1iZXJMYXRlc3Q8VD4obm90aWZpZXI6IE9ic2VydmFibGU8Ym9vbGVhbj4pOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248VD4ge1xuICByZXR1cm4gcGlwZShcbiAgICBjb21iaW5lTGF0ZXN0T3Aobm90aWZpZXIpLFxuICAgIHNraXBXaGlsZSgoW18sIGRvbmVTa2lwcGluZ10pID0+ICFkb25lU2tpcHBpbmcpLFxuICAgIG1hcCgoW3ZhbHVlXSkgPT4gdmFsdWUpKTtcbn1cblxuLyoqIERlc3Ryb3kgdGhlIHBsYXllciBpZiB0aGVyZSBhcmUgbm8gb3B0aW9ucywgb3IgY3JlYXRlIHRoZSBwbGF5ZXIgaWYgdGhlcmUgYXJlIG9wdGlvbnMuICovXG5mdW5jdGlvbiBzeW5jUGxheWVyU3RhdGUoXG4gIHBsYXllcjogVW5pbml0aWFsaXplZFBsYXllciB8IHVuZGVmaW5lZCxcbiAgW2NvbnRhaW5lciwgdmlkZW9PcHRpb25zLCBuZ1pvbmVdOiBbSFRNTEVsZW1lbnQsIFlULlBsYXllck9wdGlvbnMgfCB1bmRlZmluZWQsIE5nWm9uZV0sXG4pOiBVbmluaXRpYWxpemVkUGxheWVyIHwgdW5kZWZpbmVkIHtcbiAgaWYgKHBsYXllciAmJiB2aWRlb09wdGlvbnMgJiYgcGxheWVyLnBsYXllclZhcnMgIT09IHZpZGVvT3B0aW9ucy5wbGF5ZXJWYXJzKSB7XG4gICAgLy8gVGhlIHBsYXllciBuZWVkcyB0byBiZSByZWNyZWF0ZWQgaWYgdGhlIHBsYXllclZhcnMgYXJlIGRpZmZlcmVudC5cbiAgICBwbGF5ZXIuZGVzdHJveSgpO1xuICB9IGVsc2UgaWYgKCF2aWRlb09wdGlvbnMpIHtcbiAgICBpZiAocGxheWVyKSB7XG4gICAgICAvLyBEZXN0cm95IHRoZSBwbGF5ZXIgaWYgdGhlIHZpZGVvSWQgd2FzIHJlbW92ZWQuXG4gICAgICBwbGF5ZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAocGxheWVyKSB7XG4gICAgcmV0dXJuIHBsYXllcjtcbiAgfVxuXG4gIC8vIEltcG9ydGFudCEgV2UgbmVlZCB0byBjcmVhdGUgdGhlIFBsYXllciBvYmplY3Qgb3V0c2lkZSBvZiB0aGUgYE5nWm9uZWAsIGJlY2F1c2UgaXQga2lja3NcbiAgLy8gb2ZmIGEgMjUwbXMgc2V0SW50ZXJ2YWwgd2hpY2ggd2lsbCBjb250aW51YWxseSB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gaWYgd2UgZG9uJ3QuXG4gIGNvbnN0IG5ld1BsYXllcjogVW5pbml0aWFsaXplZFBsYXllciA9XG4gICAgICBuZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gbmV3IFlULlBsYXllcihjb250YWluZXIsIHZpZGVvT3B0aW9ucykpO1xuICBuZXdQbGF5ZXIudmlkZW9JZCA9IHZpZGVvT3B0aW9ucy52aWRlb0lkO1xuICBuZXdQbGF5ZXIucGxheWVyVmFycyA9IHZpZGVvT3B0aW9ucy5wbGF5ZXJWYXJzO1xuICByZXR1cm4gbmV3UGxheWVyO1xufVxuXG4vKipcbiAqIENhbGwgY3VlVmlkZW9CeUlkIGlmIHRoZSB2aWRlb0lkIGNoYW5nZXMsIG9yIHdoZW4gc3RhcnQgb3IgZW5kIHNlY29uZHMgY2hhbmdlLiBjdWVWaWRlb0J5SWQgd2lsbFxuICogY2hhbmdlIHRoZSBsb2FkZWQgdmlkZW8gaWQgdG8gdGhlIGdpdmVuIHZpZGVvSWQsIGFuZCBzZXQgdGhlIHN0YXJ0IGFuZCBlbmQgdGltZXMgdG8gdGhlIGdpdmVuXG4gKiBzdGFydC9lbmQgc2Vjb25kcy5cbiAqL1xuZnVuY3Rpb24gYmluZEN1ZVZpZGVvQ2FsbChcbiAgcGxheWVyT2JzOiBPYnNlcnZhYmxlPFBsYXllciB8IHVuZGVmaW5lZD4sXG4gIHZpZGVvSWRPYnM6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPixcbiAgc3RhcnRTZWNvbmRzT2JzOiBPYnNlcnZhYmxlPG51bWJlciB8IHVuZGVmaW5lZD4sXG4gIGVuZFNlY29uZHNPYnM6IE9ic2VydmFibGU8bnVtYmVyIHwgdW5kZWZpbmVkPixcbiAgc3VnZ2VzdGVkUXVhbGl0eU9iczogT2JzZXJ2YWJsZTxZVC5TdWdnZXN0ZWRWaWRlb1F1YWxpdHkgfCB1bmRlZmluZWQ+LFxuICBkZXN0cm95ZWQ6IE9ic2VydmFibGU8dm9pZD4sXG4pIHtcbiAgY29uc3QgY3VlT3B0aW9uc09icyA9IGNvbWJpbmVMYXRlc3QoW3N0YXJ0U2Vjb25kc09icywgZW5kU2Vjb25kc09ic10pXG4gICAgLnBpcGUobWFwKChbc3RhcnRTZWNvbmRzLCBlbmRTZWNvbmRzXSkgPT4gKHtzdGFydFNlY29uZHMsIGVuZFNlY29uZHN9KSkpO1xuXG4gIC8vIE9ubHkgcmVzcG9uZCB0byBjaGFuZ2VzIGluIGN1ZSBvcHRpb25zIGlmIHRoZSBwbGF5ZXIgaXMgbm90IHJ1bm5pbmcuXG4gIGNvbnN0IGZpbHRlcmVkQ3VlT3B0aW9ucyA9IGN1ZU9wdGlvbnNPYnNcbiAgICAucGlwZShmaWx0ZXJPbk90aGVyKHBsYXllck9icywgcGxheWVyID0+ICEhcGxheWVyICYmICFoYXNQbGF5ZXJTdGFydGVkKHBsYXllcikpKTtcblxuICAvLyBJZiB0aGUgdmlkZW8gaWQgY2hhbmdlZCwgdGhlcmUncyBubyByZWFzb24gdG8gcnVuICdjdWUnIHVubGVzcyB0aGUgcGxheWVyXG4gIC8vIHdhcyBpbml0aWFsaXplZCB3aXRoIGEgZGlmZmVyZW50IHZpZGVvIGlkLlxuICBjb25zdCBjaGFuZ2VkVmlkZW9JZCA9IHZpZGVvSWRPYnNcbiAgICAgIC5waXBlKGZpbHRlck9uT3RoZXIocGxheWVyT2JzLCAocGxheWVyLCB2aWRlb0lkKSA9PiAhIXBsYXllciAmJiBwbGF5ZXIudmlkZW9JZCAhPT0gdmlkZW9JZCkpO1xuXG4gIC8vIElmIHRoZSBwbGF5ZXIgY2hhbmdlZCwgdGhlcmUncyBubyByZWFzb24gdG8gcnVuICdjdWUnIHVubGVzcyB0aGVyZSBhcmUgY3VlIG9wdGlvbnMuXG4gIGNvbnN0IGNoYW5nZWRQbGF5ZXIgPSBwbGF5ZXJPYnMucGlwZShcbiAgICBmaWx0ZXJPbk90aGVyKFxuICAgICAgY29tYmluZUxhdGVzdChbdmlkZW9JZE9icywgY3VlT3B0aW9uc09ic10pLFxuICAgICAgKFt2aWRlb0lkLCBjdWVPcHRpb25zXSwgcGxheWVyKSA9PlxuICAgICAgICAgICEhcGxheWVyICYmXG4gICAgICAgICAgICAodmlkZW9JZCAhPSBwbGF5ZXIudmlkZW9JZCB8fCAhIWN1ZU9wdGlvbnMuc3RhcnRTZWNvbmRzIHx8ICEhY3VlT3B0aW9ucy5lbmRTZWNvbmRzKSkpO1xuXG4gIG1lcmdlKGNoYW5nZWRQbGF5ZXIsIGNoYW5nZWRWaWRlb0lkLCBmaWx0ZXJlZEN1ZU9wdGlvbnMpXG4gICAgLnBpcGUoXG4gICAgICB3aXRoTGF0ZXN0RnJvbShjb21iaW5lTGF0ZXN0KFtwbGF5ZXJPYnMsIHZpZGVvSWRPYnMsIGN1ZU9wdGlvbnNPYnMsIHN1Z2dlc3RlZFF1YWxpdHlPYnNdKSksXG4gICAgICBtYXAoKFtfLCB2YWx1ZXNdKSA9PiB2YWx1ZXMpLFxuICAgICAgdGFrZVVudGlsKGRlc3Ryb3llZCksXG4gICAgKVxuICAgIC5zdWJzY3JpYmUoKFtwbGF5ZXIsIHZpZGVvSWQsIGN1ZU9wdGlvbnMsIHN1Z2dlc3RlZFF1YWxpdHldKSA9PiB7XG4gICAgICBpZiAoIXZpZGVvSWQgfHwgIXBsYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwbGF5ZXIudmlkZW9JZCA9IHZpZGVvSWQ7XG4gICAgICBwbGF5ZXIuY3VlVmlkZW9CeUlkKHtcbiAgICAgICAgdmlkZW9JZCxcbiAgICAgICAgc3VnZ2VzdGVkUXVhbGl0eSxcbiAgICAgICAgLi4uY3VlT3B0aW9ucyxcbiAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBoYXNQbGF5ZXJTdGFydGVkKHBsYXllcjogWVQuUGxheWVyKTogYm9vbGVhbiB7XG4gIGNvbnN0IHN0YXRlID0gcGxheWVyLmdldFBsYXllclN0YXRlKCk7XG4gIHJldHVybiBzdGF0ZSAhPT0gWVQuUGxheWVyU3RhdGUuVU5TVEFSVEVEICYmIHN0YXRlICE9PSBZVC5QbGF5ZXJTdGF0ZS5DVUVEO1xufVxuXG5mdW5jdGlvbiBwbGF5ZXJJc1JlYWR5KHBsYXllcjogVW5pbml0aWFsaXplZFBsYXllcik6IHBsYXllciBpcyBQbGF5ZXIge1xuICByZXR1cm4gJ2dldFBsYXllclN0YXR1cycgaW4gcGxheWVyO1xufVxuXG4vKiogQ29tYmluZXMgdGhlIHR3byBvYnNlcnZhYmxlcyB0ZW1wb3JhcmlseSBmb3IgdGhlIGZpbHRlciBmdW5jdGlvbi4gKi9cbmZ1bmN0aW9uIGZpbHRlck9uT3RoZXI8UiwgVD4oXG4gIG90aGVyT2JzOiBPYnNlcnZhYmxlPFQ+LFxuICBmaWx0ZXJGbjogKHQ6IFQsIHI/OiBSKSA9PiBib29sZWFuLFxuKTogTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uPFI+IHtcbiAgcmV0dXJuIHBpcGUoXG4gICAgd2l0aExhdGVzdEZyb20ob3RoZXJPYnMpLFxuICAgIGZpbHRlcigoW3ZhbHVlLCBvdGhlcl0pID0+IGZpbHRlckZuKG90aGVyLCB2YWx1ZSkpLFxuICAgIG1hcCgoW3ZhbHVlXSkgPT4gdmFsdWUpLFxuICApO1xufVxuIl19