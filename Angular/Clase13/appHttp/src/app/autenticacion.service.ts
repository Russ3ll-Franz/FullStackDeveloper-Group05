import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError, retry } from 'rxjs/operators';
import { environment } from "../environments/environment";
import { Errores } from "./errores";
import { IUsuario } from "./usuario.interface";


@Injectable()
export class AutenticacionService {
	urlApiRest: string = environment.urlApiRest
	objErrores: Errores = new Errores()

	constructor(private http: HttpClient, private ruteador: Router) { }

	registrar(usuario: IUsuario): Observable<any> {
		return this.http.post(`${this.urlApiRest}/usuario`, usuario)
			.pipe(
				retry(3),
				catchError(this.objErrores.manejador)
			)
	}

	login(usuario: IUsuario) {
		this.http.post(`${this.urlApiRest}/usuario/login`, usuario)
			.pipe(
				retry(3),
				catchError(this.objErrores.manejador)
			).subscribe(
				(data: any) => {
					localStorage.setItem("accessToken", data.resultado.accessToken)
					//console.log(data)
					this.ruteador.navigate(["/cantante"])
				}
			)
	}
}