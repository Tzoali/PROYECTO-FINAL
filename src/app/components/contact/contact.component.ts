import { MiApiService } from './../../services/mi-api.service';
import { TexttospeechService } from './../../services/texttospeech.service';
import { SnackbarService } from './../../services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm;
  enviado = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    public tts: TexttospeechService,
    private miApi: MiApiService) {

    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comentario: ['', [Validators.required]],
      condicion: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      this.enviado = true;
      this.tts.play('Enviando información');

      this.miApi.sendEmail({

        nombre: this.contactForm.value.name,
        correo: this.contactForm.value.email,
        contenido: this.contactForm.value.comentario

      }).subscribe((data: any) => {

        this.enviado = false;
        console.log(data);
        this.snackBarService.openSnackBar('Formulario enviado', 'Aceptar');

      });
    } else {
      if (this.contactForm.get('name').hasError('required')) {
        this.snackBarService.openSnackBar('Por favor ingresa el nombre', 'Aceptar');
        this.tts.play('Por favor ingresa el nombre');
      } else if (this.contactForm.get('email').hasError('required')) {
        this.snackBarService.openSnackBar('Por favor ingresa una dirección de correo válida', 'Aceptar');
        this.tts.play('Por favor ingresa una dirección de correo válida');
      } else if (this.contactForm.get('comentario').hasError('required')) {
        this.snackBarService.openSnackBar('Por favor ingresa el comentario', 'Aceptar');
        this.tts.play('Por favor ingresa el comentario');
      } else if (this.contactForm.get('condicion').hasError('required')) {
        this.snackBarService.openSnackBar('Por favor acepta la condición', 'Aceptar');
        this.tts.play('Por favor acepta la condición');
      }
    }
  }

}
