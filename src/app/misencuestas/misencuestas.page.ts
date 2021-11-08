import { Component, OnInit } from '@angular/core';
import { DataService } from "./../services/data/data.service";
import { Router } from "@angular/router";

@Component({
	selector: 'app-misencuestas',
	templateUrl: './misencuestas.page.html',
	styleUrls: ['./misencuestas.page.scss'],
})
export class MisencuestasPage implements OnInit {
	encuestasTotales

	constructor(private data: DataService, private router:Router) {
		
		// Badge
		this.data.gioEncuestasTotales.subscribe(data => {
			try {
				this.encuestasTotales = JSON.parse(data)
				console.log( this.encuestasTotales )
			} catch (error) {
				this.encuestasTotales = data
				console.log( this.encuestasTotales )
			}
		})

	}

	ngOnInit() {
		this.data.inicializarDatos()
	}

	abrirEnlace(item){
		this.router.navigate(['/registro-detalle', { id: item }])
	}

}