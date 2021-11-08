import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "./../../../environments/environment";

@Injectable({
	providedIn: 'root'
})

export class DataService {
	gioUsuario = new EventEmitter()
	gioUrlServer = new EventEmitter()
	gioPreguntas = new EventEmitter()
	gioEncuestaTitulo = new EventEmitter()
	gioEncuestaActual = new EventEmitter()
	gioEncuestaActualRespuestas = new EventEmitter()
	gioEncuestaActiva = new EventEmitter()
	gioEncuestasTotales = new EventEmitter()

	multipleArray = []

	url = ""
	todasLasEncuestas

	constructor(private http: HttpClient, private data:DataService) {
		this.url = this.getURL()
		this.http.get(this.url + "?traer=todos")

		this.todasLasEncuestas = this.http.get(this.url + "?traer=todos")
	}


	setURL(url) {
		localStorage.setItem("urlServer", url)
		this.gioUrlServer.emit(url)
	}

	getURL(){
		let urlAlmacenada = localStorage.getItem('urlServer')
		return urlAlmacenada
	}

	setUsuario(usuario) {
		localStorage.setItem("gioUsuario", usuario)
		this.gioUsuario.emit(usuario)
	}


	setTitulo(titulo) {
		localStorage.setItem("gioEncuestaTitulo", titulo)
		this.gioEncuestaTitulo.emit(titulo)
	}


	setPreguntas(preguntas) {
		localStorage.setItem("gioPreguntas", JSON.stringify(preguntas))
		this.gioPreguntas.emit(preguntas)
	}


	setGioEncuestaActual(id) {
		localStorage.setItem("gioEncuestaActual", id)
		this.gioEncuestaActual.emit(id)
	}


	setGioEncuestaActualRespuestas(respuestas) {
		// Se inician las respuestas dependiendo lo que se asigna
		respuestas = respuestas == '{}' ? '{}' : JSON.stringify(respuestas)
		localStorage.setItem("gioEncuestaActualRespuestas", respuestas)
		this.gioEncuestaActualRespuestas.emit(respuestas)
	}


	setGioEncuestaActiva(encuestaActiva) {
		localStorage.setItem("gioEncuestaActiva", encuestaActiva)
		this.gioEncuestaActiva.emit(encuestaActiva)
	}


	setGioEncuestasTotales(encuestas){
		console.log("Esto es lo que se está metiendo", encuestas)
		let jsonEncuestas = JSON.stringify(encuestas)
		console.log("Esto es lo que se está metiendo 2", jsonEncuestas)
		localStorage.setItem('gioEncuestas', jsonEncuestas)
		this.gioEncuestasTotales.emit(jsonEncuestas)

	}

	inicializarDatos() {
		let gioUsuario = localStorage.getItem('gioUsuario')
		let gioEncuestaTitulo = localStorage.getItem('gioEncuestaTitulo')
		let gioPreguntas = localStorage.getItem('gioPreguntas')
		let encuestasTotales = localStorage.getItem('gioEncuestas')

		if (gioUsuario) this.gioUsuario.emit(gioUsuario)
		if (gioEncuestaTitulo) this.gioEncuestaTitulo.emit(gioEncuestaTitulo)
		if (gioPreguntas) this.gioPreguntas.emit(gioPreguntas)
		if (encuestasTotales) this.gioEncuestasTotales.emit(encuestasTotales)
	}


	descargarEncuestas(item) {
		let url = this.url + `?traer=${item}`
		this.http.get(url).subscribe(data => {
			// Guardamos título
			this.setTitulo(item)
			// Guardamos preguntas
			this.setPreguntas(data)
		})
	}


	crearEncuesta() {
		let usuario = localStorage.getItem('gioUsuario')
		let fecha = new Date().getTime()
		let id = `${usuario}_${fecha}`

		this.setGioEncuestaActual(id)
		this.setGioEncuestaActualRespuestas('{}')
		this.setGioEncuestaActiva('true')
	}


	ingresarPreguntaElegida(pregunta, opcion) {
		let gioEncuestaActualRespuestas = JSON.parse(localStorage.getItem('gioEncuestaActualRespuestas'))
		gioEncuestaActualRespuestas[pregunta] = opcion
		this.setGioEncuestaActualRespuestas(gioEncuestaActualRespuestas)
	}


	ingresarMultipleElegida(pregunta, opcion) {
		if (this.multipleArray.indexOf(opcion) >= 0) {
			this.multipleArray.splice(this.multipleArray.indexOf(opcion))
		} else {
			this.multipleArray.push(opcion)
		}

		let gioEncuestaActualRespuestas = JSON.parse(localStorage.getItem('gioEncuestaActualRespuestas'))
		gioEncuestaActualRespuestas[pregunta] = this.multipleArray
		this.setGioEncuestaActualRespuestas(gioEncuestaActualRespuestas)
	}


	guardarEncuesta(){
		let encuestaId = localStorage.getItem('gioEncuestaActual')
		let jsonEncuestas = this.traerObjEncuestasGuardadas()
		jsonEncuestas[encuestaId] = this.crearObjetoEncuestas(encuestaId)
		this.setGioEncuestasTotales(jsonEncuestas)
		this.gioEncuestasTotales.emit(jsonEncuestas)
	}


	crearObjetoEncuestas(encuestaId){
		let respuestasActuales = JSON.parse(localStorage.getItem('gioEncuestaActualRespuestas'))
		respuestasActuales['id'] = encuestaId
		respuestasActuales['sincronizado'] = "No"

		return respuestasActuales
	}


	traerObjEncuestasGuardadas(){
		let objeto = '{}'
		let encustasGuardadas = localStorage.getItem('gioEncuestas')

		if( encustasGuardadas != null ){
			objeto = encustasGuardadas
		}

		return JSON.parse(objeto)
	}

}	
