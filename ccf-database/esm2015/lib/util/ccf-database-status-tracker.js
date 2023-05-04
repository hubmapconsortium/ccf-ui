import { __awaiter } from "tslib";
export class CCFDatabaseStatusTracker {
    constructor(database) {
        this.database = database;
        this.connect();
    }
    toJson() {
        return {
            status: this.status,
            message: this.message,
            checkback: this.status === 'Ready' || this.status === 'Error' ? 60 * 60 * 1000 : 2000,
            loadTime: this.loadTime
        };
    }
    connect() {
        this.status = 'Loading';
        this.message = 'Loading database';
        const startTime = Date.now();
        return this.database.connect()
            .then((loaded) => __awaiter(this, void 0, void 0, function* () {
            if (loaded) {
                // Warm up the database
                this.message = 'Building scene';
                yield this.database.getScene();
                this.message = 'Building tissue block results';
                yield this.database.getTissueBlockResults();
                this.message = 'Aggregating results';
                yield this.database.getAggregateResults();
                this.status = 'Ready';
                this.message = 'Database successfully loaded';
            }
            else {
                this.status = 'Error';
                this.message = 'Unknown error while loading database';
            }
        }))
            .catch((error) => {
            var _a;
            this.status = 'Error';
            this.message = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Unknown error while loading database';
        })
            .finally(() => {
            this.loadTime = Date.now() - startTime;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NmLWRhdGFiYXNlLXN0YXR1cy10cmFja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NmLWRhdGFiYXNlL3NyYy9saWIvdXRpbC9jY2YtZGF0YWJhc2Utc3RhdHVzLXRyYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE1BQU0sT0FBTyx3QkFBd0I7SUFLbkMsWUFBbUIsUUFBcUI7UUFBckIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3JGLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO0lBQ0osQ0FBQztJQUVPLE9BQU87UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBRWxDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO2FBQzNCLElBQUksQ0FBQyxDQUFPLE1BQU0sRUFBRSxFQUFFO1lBQ3JCLElBQUksTUFBTSxFQUFFO2dCQUNWLHVCQUF1QjtnQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztnQkFDaEMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLCtCQUErQixDQUFDO2dCQUMvQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztnQkFDckMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO2dCQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDO2FBQy9DO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO2dCQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLHNDQUFzQyxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQyxDQUFBLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUEyQixFQUFFLEVBQUU7O1lBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxtQ0FBSSxzQ0FBc0MsQ0FBQztRQUMxRSxDQUFDLENBQUM7YUFDRCxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YWJhc2VTdGF0dXMgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENDRkRhdGFiYXNlIH0gZnJvbSAnLi4vY2NmLWRhdGFiYXNlJztcblxuXG5leHBvcnQgY2xhc3MgQ0NGRGF0YWJhc2VTdGF0dXNUcmFja2VyIHtcbiAgc3RhdHVzOiAnUmVhZHknIHwgJ0xvYWRpbmcnIHwgJ0Vycm9yJztcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgbG9hZFRpbWU/OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGRhdGFiYXNlOiBDQ0ZEYXRhYmFzZSkge1xuICAgIHRoaXMuY29ubmVjdCgpO1xuICB9XG5cbiAgdG9Kc29uKCk6IERhdGFiYXNlU3RhdHVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIGNoZWNrYmFjazogdGhpcy5zdGF0dXMgPT09ICdSZWFkeScgfHwgdGhpcy5zdGF0dXMgPT09ICdFcnJvcicgPyA2MCAqIDYwICogMTAwMCA6IDIwMDAsXG4gICAgICBsb2FkVGltZTogdGhpcy5sb2FkVGltZVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zdGF0dXMgPSAnTG9hZGluZyc7XG4gICAgdGhpcy5tZXNzYWdlID0gJ0xvYWRpbmcgZGF0YWJhc2UnO1xuXG4gICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5jb25uZWN0KClcbiAgICAgIC50aGVuKGFzeW5jIChsb2FkZWQpID0+IHtcbiAgICAgICAgaWYgKGxvYWRlZCkge1xuICAgICAgICAgIC8vIFdhcm0gdXAgdGhlIGRhdGFiYXNlXG4gICAgICAgICAgdGhpcy5tZXNzYWdlID0gJ0J1aWxkaW5nIHNjZW5lJztcbiAgICAgICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLmdldFNjZW5lKCk7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlID0gJ0J1aWxkaW5nIHRpc3N1ZSBibG9jayByZXN1bHRzJztcbiAgICAgICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLmdldFRpc3N1ZUJsb2NrUmVzdWx0cygpO1xuICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICdBZ2dyZWdhdGluZyByZXN1bHRzJztcbiAgICAgICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLmdldEFnZ3JlZ2F0ZVJlc3VsdHMoKTtcbiAgICAgICAgICB0aGlzLnN0YXR1cyA9ICdSZWFkeSc7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlID0gJ0RhdGFiYXNlIHN1Y2Nlc3NmdWxseSBsb2FkZWQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ0Vycm9yJztcbiAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnVW5rbm93biBlcnJvciB3aGlsZSBsb2FkaW5nIGRhdGFiYXNlJztcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3I6IHsgbWVzc2FnZT86IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gJ0Vycm9yJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gZXJyb3I/Lm1lc3NhZ2UgPz8gJ1Vua25vd24gZXJyb3Igd2hpbGUgbG9hZGluZyBkYXRhYmFzZSc7XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRUaW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=