import { Component, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from "@angular/router";
// Servicios
import { DataService } from "./../services/data/data.service";
@Component({
	selector: 'app-encuesta',
	templateUrl: './encuesta.page.html',
	styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage {
	preguntaId:number
	pregunta
	gioPreguntas
	botonHabilitado:boolean = true


	constructor(
		private activatedRoute: ActivatedRoute,
		private data: DataService,
		private router: Router,
		private actionSheetCtrl: ActionSheetController
		) {
		// Número de la pregunta
		this.preguntaId = this.numeroPregunta()
		// Obtiene todas las preguntas
		this.gioPreguntas = JSON.parse(localStorage.getItem('gioPreguntas'))
		// Retorna la pregunta en turno en un JSON
		this.pregunta = this.gioPreguntas[this.preguntaId];
	}

	numeroPregunta() {
		let id = this.activatedRoute.snapshot.paramMap.get('id')
		let preguntaTemporalId = id ? id : 0
		return Number(preguntaTemporalId)
	}


	ingresarPreguntaElegida(pregunta, opcion) {
		this.data.ingresarPreguntaElegida(pregunta, opcion)
		this.botonHabilitado = false
	}


	multipleElegida(pregunta, opcion) {
		this.data.ingresarMultipleElegida(pregunta, opcion)
		this.botonHabilitado = false
	}


	finalizar() {
		this.router.navigate(['/finalizar'])
	}


	avanzar(item) {
		this.router.navigate(['/encuesta', { id: item }])
	}


	procesarLiteral = function (pregunta, respuesta) {
		console.log("Procesando literal")
	}


	detenerEncuesta() {
		let actionSheet = this.actionSheetCtrl.create({

			buttons: [
				{
					text: 'Detener encuesta',
					//role: 'destructive',
					handler: () => {
						// this.navCtrl.popToRoot();
					}
				}, {
					text: 'Cerrar este menú',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		// actionSheet.present();
	}

	

}
