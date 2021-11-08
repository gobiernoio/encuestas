import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from "./../../environments/environment";
// Services
import { DataService } from "./../services/data/data.service";

@Component({
	selector: 'app-configuracion',
	templateUrl: './configuracion.page.html',
	styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
	usuario
	serverURL

	constructor(
		public miHttp: HttpClient,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController, 
		private data:DataService
	) {	
		this.usuario = localStorage.getItem('gioUsuario')
		this.serverURL = localStorage.getItem('urlServer')
		
		this.data.gioUsuario.subscribe(usuario=>{
			this.usuario = usuario
		})
	}

	ngOnInit() {
	}

	async sincronizar() {
		const cargador = await this.loadingCtrl.create({
			message: 'Sincronizando...',
			duration: 2000
		});
		await cargador.present();

		
		let url = this.data.getURL()
		let registros = JSON.parse(localStorage.getItem('gioEncuestas'));
		let encuesta = localStorage.getItem('gioEncuestaTitulo');
		
		for (let item in registros) {
			let info = JSON.stringify(registros[item])
			let route = `${url}?encuesta=${encuesta}&query=${info}`
			
			this.miHttp.get(route).subscribe({
				complete: () => {
					console.log("Complete ", item)
				}, 
				next: () => {
					console.log("Next", item)
				}, 
				error: (error) => {
					if(error.status == 200) {
						registros[item].sincronizado = "Si"
					}
				}
			})
		}
		console.log("Antes de meterse ", registros)
		localStorage.setItem('gioEncuestas', JSON.stringify(registros))
		console.log("Luego de meterse", localStorage.getItem('gioEncuestas'))
		cargador.dismiss()
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


	async borrarRegistros() {
		let confirm = await this.alertCtrl.create({
			header: 'Borrarás los registros',
			message: 'No podrá recuperar sus registros.',
			buttons: [
				{
					text: 'Cancelar',
					handler: () => {
						console.log('Disagree clicked');
					}
				},
				{
					text: 'Borrar todo',
					handler: () => {
						this.data.setGioEncuestasTotales({})
					}
				}
			]
		});
		await confirm.present();
	}

	
	async cambiarUsuario(usuario) {
		let prompt = await this.alertCtrl.create({
			header: 'Cambiar usuario',
			message: "Ingrese el nuevo usuario.",
			inputs: [
				{
					name: 'usuario',
					placeholder: usuario
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Guardar',
					handler: data => {
						this.data.setUsuario(data.usuario)
					}
				}
			]
		});
		await prompt.present();
	}




	async cambiarServerApi(serverApi) {
		let prompt = await this.alertCtrl.create({
			header: 'Cambiar usuario',
			message: "Ingrese el nuevo usuario.",
			inputs: [
				{
					name: 'server',
					placeholder: serverApi
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					handler: data => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Guardar',
					handler: data => {
						this.data.setURL(data.server)
					}
				}
			]
		});
		await prompt.present();
	}

}
