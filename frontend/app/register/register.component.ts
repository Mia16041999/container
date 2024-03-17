import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    signupForm = new FormGroup({
        username: new FormControl(""),
        password: new FormControl("")
    });
    isNotAvailable = false

    constructor(private router: Router) {
    }

    login() {
        this.router.navigate(['/login'])
    }

    async signup(event: any) {
        event.preventDefault();
        this.isNotAvailable = false;
        const username = this.signupForm.value.username;
        const password = this.signupForm.value.password;
    
        try {
            const res = await fetch('http://localhost:4000/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!res.ok) {
                this.isNotAvailable = true;
                console.error(`Signup failed with status: ${res.status}`);
                const errorResponse = await res.json();
                console.error(`Error response from server: ${errorResponse}`);
            } else {
                this.login();
            }
        } catch (error) {
            console.error('An error occurred during signup:', error);
        }
    }
    
    
}
