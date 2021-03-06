import { TexttospeechService } from './../../services/texttospeech.service';
import { TtsdialogComponent } from './../ttsdialog/ttsdialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-texttospeech',
  templateUrl: './texttospeech.component.html',
  styleUrls: ['./texttospeech.component.css']
})
export class TexttospeechComponent implements OnInit {

  constructor(public dialog: MatDialog, public tts: TexttospeechService) { }

  ngOnInit(): void {
  }

  // Para el dialog
  openDialog() {

    this.tts.guardarEstado();

    const dialogRef = this.dialog.open(TtsdialogComponent);

    dialogRef.afterClosed().subscribe((result) => {

      // Si el usuario le dio en aceptar
      if (result !== undefined) {

        this.tts.setIdioma(result);
        if (this.tts.getActivo()){
          this.tts.play('El lector de pantalla ha sido activado');
        } else {
          this.tts.play('El lector de pantalla esta desactivado');
        }

      } else { // Se salio o le dio a cancelar

        this.tts.recuperarEstado();

      }

    });
  }

}
