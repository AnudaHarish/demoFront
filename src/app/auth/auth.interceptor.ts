import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "../_service/user-auth.service";
import { UserService } from "../_service/user/user.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { icon } from "@fortawesome/fontawesome-svg-core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor, OnInit {

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {




  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthService.getToken();
    console.log(token);
    req = this.addToken(req, token);
    console.log(req);
    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err.status);
          if (err.status === 401) {

            // this.showSuccessMessage("SweetAlert warning", "Erro 401", "warining", true)
          } else if (err.status === 403) {

            this.showSuccessMessage("SweetAlert warning", "Erro 403", "warining", true)

          }
          return throwError("something went wrong")
        }


      )
    )

  }


  private addToken(request: HttpRequest<any>, token: string) {

    return request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }


  showSuccessMessage(
    title, message, icon = null,
    showCancelButton = true) {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton
    })

  }




}