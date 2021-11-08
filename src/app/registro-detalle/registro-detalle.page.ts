import { Component, OnInit } from '@angular/core';
import { DataService } from "./../services/data/data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: 'app-registro-detalle',
	templateUrl: './registro-detalle.page.html',
	styleUrls: ['./registro-detalle.page.scss'],
})
export class RegistroDetallePage implements OnInit {
	registro
	encuestas

	constructor(private data: DataService, private parametros:ActivatedRoute) {
		
		this.data.gioEncuestasTotales.subscribe(data=>{
			this.encuestas = JSON.parse(data)
			let id = this.parametros.snapshot.paramMap.get('id')
			this.registro = this.encuestas[id]
			console.log(this.registro)
		})
		
		this.data.inicializarDatos()
	}

	ngOnInit() {
	}

}
