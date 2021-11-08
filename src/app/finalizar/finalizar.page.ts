import { Component } from '@angular/core';
import { DataService } from "./../services/data/data.service";

@Component({
	selector: 'app-finalizar',
	templateUrl: './finalizar.page.html',
	styleUrls: ['./finalizar.page.scss'],
})
export class FinalizarPage {

	encuestaGuardada:boolean = false

	constructor(private data:DataService) {		
	}


	guardarEncuesta() {
		this.data.guardarEncuesta()
		this.encuestaGuardada = true
	}
}
