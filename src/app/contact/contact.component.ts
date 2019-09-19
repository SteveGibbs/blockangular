import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'] // array of style sheets
})

export class ContactComponent implements OnInit, OnDestroy {
 message = '';
  ngOnInit(): void {
 }
 onSubmit(form: NgForm) {
   // alert('hello');
   this.message = 'Thank you for contacting us.  We will respond in 24 hours';
 }
 ngOnDestroy(): void {
 }
}
