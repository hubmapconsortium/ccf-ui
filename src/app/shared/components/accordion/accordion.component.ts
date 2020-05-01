import { Component, Input } from '@angular/core';

@Component({
  selector: 'ccf-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

  @Input() metadata: Record<string, unknown> =
    {
      'Patient Number': 64354,
      'Procedure ID': 66598,
      Date: '1/30/2019',
      Age: 38,
      Gender: 'Female',
      Race: 'White',
      Height: '165.1 cm',
      Weight: '115.2 kg',
      BMI: 42.3,
      Comorbidities: 'Obesity',
      'Type of Procedure': 'Total Nephrectomy',
      'Indications for Procedure': 'Renal tumor',
      Laterality: 'Lest Tissue Type: kidney',
      'Dimensions (mm)': 'L: 19 x W: 13 x H: 7',
      'Anatomical Landmark': 'Lower Pole',
      'Distance from Tumor': '7 cm Sample',
      Processing: 'Frozen',
      'Method of Freezing': 'Dry ice/Isopentane Slurry',
      'Embedding Media': 'CMC'
    };

  labels = Object.keys(this.metadata);
  values = Object.values(this.metadata);
}
