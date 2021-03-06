import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ICantante } from "../cantante.interface";
import { Errores } from "../errores";

@Injectable()
export class CantanteService {
	urlApiRest: string = environment.urlApiRest
	errores: Errores = new Errores()

	cambioEstado: Subject<any> = new Subject<any>()

	constructor(private http: HttpClient) { }

	listar(): Observable<ICantante[]> {
		return this.http.get<ICantante[]>(`${this.urlApiRest}/cantante`)
			.pipe(
				retry(3),
				catchError(this.errores.manejador),
				map((respuesta: any) => {
					return respuesta.resultado
				})
			)
	}

	insertar(cantante: ICantante): Observable<any> {
		return this.http.post<any>(`${this.urlApiRest}/cantante`, cantante, )
			.pipe(
				retry(3),
				catchError(this.errores.manejador)
			)
	}

	eliminar(_id) {
		this.http.delete(`${this.urlApiRest}/cantante/${_id}`)
			.pipe(
				retry(3),
				catchError(this.errores.manejador)
			)
			.subscribe(
				resp => this.cambioEstado.next()
			)
	}

	detalle(_id): Observable<ICantante> {
		return this.http.get<ICantante>(`${this.urlApiRest}/cantante/${_id}`)
			.pipe(
				retry(3),
				catchError(this.errores.manejador),
				map((respuesta: any) => respuesta.resultado)
			)
	}


	actualizar(cantante: ICantante): Observable<any> {
		return this.http.put<any>(`${this.urlApiRest}/cantante/${cantante._id}`, cantante)
			.pipe(
				retry(3),
				catchError(this.errores.manejador)
			)
	}

}