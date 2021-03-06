import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ITarea } from '../modelos/tarea.interface';

@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class FormularioComponent implements OnInit {
	tarea: ITarea = {}

	@Output() onNuevaTarea = new EventEmitter<ITarea>()

	constructor() { }

	ngOnInit() {
	}

	grabar() {
		this.onNuevaTarea.emit(this.tarea)
		this.tarea = {}
	}

}
