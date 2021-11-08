import { Component } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
// Servicios
import { DataService } from "../services/data/data.service";

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	gioUsuario
	gioPreguntas
	gioEncuestaTitulo

	
	constructor(
		private router: Router, 
		private alertCtrl: AlertController, 
		private data:DataService
		) {

		// Subscribimos los datos
		this.data.gioUsuario.subscribe(usuario=>{
			this.gioUsuario = usuario
		})
		
		this.data.gioPreguntas.subscribe(preguntas=>{
			this.gioPreguntas = preguntas
		})

		this.data.gioEncuestaTitulo.subscribe(titulo=>{
			this.gioEncuestaTitulo = titulo
		})

		// Inicializamos los datos con localStorage
		this.data.inicializarDatos()
	}

	
	// Crea y guarda un usuario
	crearUsuario(usuario) {
		this.data.setUsuario(usuario)
	}

	
	// Creamos encuesta y vamos a la pregunta "1"
	iniciarEncuesta() {
		this.data.crearEncuesta()
		this.router.navigate(['/encuesta', { id: '0' }])
	}


	// =========	CARGAR ENCUESTAS DISPONIBLES	=========
	llamarCargaEncuestas() {
		this.data.todasLasEncuestas.subscribe(data=>{
			this.lanzarSelectEncuesta(data)
		})
	}


	// =========	SELECCIONAR NUEVA ENCUESTA	=========
	lanzarSelectEncuesta(data) {
		let encuestas = data
		let arrayInputs = []

		for (let item in encuestas) {
			let elemento = { name: encuestas[item].nombre, type: 'radio', label: encuestas[item].nombre, value: encuestas[item].nombre, checked: false }
			arrayInputs.push(elemento)
		}
		this.alertEncuestas(arrayInputs)
	}


	// =========	DESCARGA Y GUARDA DATOS DE ENCUESTA	=========
	descargarEncuesta(item) {
		this.data.descargarEncuestas(item)
	}

	// =========	MOSTRAR ALERTA	=========
	async alertEncuestas(arrayInputs) {
		const alert = await this.alertCtrl.create({
			'header': 'Seleccione encuesta',
			'inputs': arrayInputs,
			'buttons': [
				{ text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
				{
					text: 'Cargar',
					handler: (data) => {
						this.descargarEncuesta(data);
					}
				}
			]
		})
		await alert.present()
	}
}