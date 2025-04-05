import { Component, OnInit,Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit {

    @Input() nombreArchivo = 'documento.pdf';
    @Input() tipoArchivo = 'PDF';
    @Input() urlArchivo = '';
    @Input() autorArchivo = 'Profesor';
    @Input() fechaSubida: Date = new Date();
    @Input() tamanoArchivo = 1024; // en KB

    safeUrl: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {
      console.log('archivo');

      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlArchivo)
    }

    ngOnInit(): void {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlArchivo);
    }

    descargarArchivo(): void {
      console.log('Descargando archivo:', this.nombreArchivo);
      const link = document.createElement('a');
      link.href = this.urlArchivo;
      link.download = this.nombreArchivo;
      link.click();
    }

}
