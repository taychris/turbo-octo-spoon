import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/service/auth.service";

import { FormControl, FormGroup } from "@Angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuItems: any[] = [];
  menuItemForm = new FormGroup({
    menuItemName: new FormControl(''),
    menuItemDetails: new FormControl(''),
    smallPrice: new FormControl(''),
    bigPrice: new FormControl(''),
  });
  secondForm = new FormGroup({ valueToGet: new FormControl('') })
  editForm = new FormGroup({ replaceValue: new FormControl('') })
  message: string;
  message2: string;
  docs: any;
  person: any;
  id: string = '';
  edit: boolean = false;

  constructor(private firestore: AngularFirestore, public authService: AuthService) { }

  ngOnInit(): void {
    this.docs = [];
    const collectionRef = this.firestore.collection('menu');
    const collectionInstance = collectionRef.valueChanges();
    collectionInstance.subscribe(ss => {
      this.menuItems = ss;
      console.log(this.menuItems);
    });
  }

  onSubmit() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    let Record = { 
      menuItemName: this.menuItemForm.value.menuItemName, 
      menuItemDetails: this.menuItemForm.value.menuItemDetails, 
      smallPrice: this.menuItemForm.value.smallPrice, 
      bigPrice: this.menuItemForm.value.bigPrice, 
     };
    console.log(Record);

    if(currentUser.uid != null) {
      this.firestore.collection('menu').doc('pizza').collection('menu').add(Record)
      .then(res => {
        this.message = "Menu item added successfully.";
        console.log(res);
        this.menuItemForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
    } else {
      window.alert('You must be logged in to create an item.')
    }
    
  }

}
