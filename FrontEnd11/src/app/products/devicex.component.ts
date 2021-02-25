import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Worker } from '../model/worker'
import { FormGroup, FormControl } from '@angular/forms';
import { AdminsService } from '../services/admins.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-devicex',
  templateUrl: './devicex.component.html',
  styleUrls: ['./devicex.component.css']
})
export class DevicexComponent implements OnInit {
  worker!: Worker;
  completeForm() {
    console.log(this.worker);
    // test for worker presence
   // if (this.worker.id == undefined) {
      if (!this.worker.id) {
        console.log(this.worker.id);
      this._AdMinService.addItem(this.worker).subscribe((worker) => {
     //   console.log(worker);
        this._AdmRouter.navigate(['/']);
      }, (error) => { console.log(error); });
    }
    else {
      // Both update and create worker
      console.log(this.worker.id);
      var zed=(this.worker);
      this._AdMinService.saveOrUpdateItem(this.worker.id, this.worker).subscribe((worker) => {
      //  console.log(worker);
        console.log(zed);
        this._AdmRouter.navigate(['/']);
      }, (error) => { console.log(error); });
    }
  }
  title!: string;
  rows: Worker[] = [];

  p: number = 1;
  limit: number = 2;
  total!: number;
  finalresults!: any;// Object;

  msgs: any;
  deletemsg: any;
  btnsubmit = true;
  btnupdate = false;

  profileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    town: new FormControl(''),
    hotel: new FormControl(''),
    isactive: new FormControl(''),
    createdat: new FormControl('')
  });
  // private workers: Worker[];
  // private workers: Worker[];
  public workers!: Worker[];
  constructor(private _userService: AdminsService,
    private _router: Router, private service: ProductService,
    private _AdMinService: AdminsService, 
    private _AdmRouter: Router) { }

  ngOnInit() {
    this._userService.getItems().subscribe(
      (workers) => { console.log(workers); this.workers = workers; }
      , (error) => { console.log(error); })
    this.service.getData().subscribe(data => {
      this.finalresults = data;
    });
    this.worker = this._AdMinService.getter();
  }

  onsubmit() {
    this.service.insertData(this.profileForm.value).subscribe(data => {
      this.msgs = data;
      this.ngOnInit();
    });
  }

  // Double
  saveOrUpdateItem(worker: Worker) {
    this._userService.setter(worker);
    this._router.navigate(['/enrolls']);
  }

  // remove worker
  deleteItem(worker: Worker) {
    this._userService.deleteItem(worker.id).subscribe(
      (data) => { this.workers.splice(this.workers.indexOf(worker), 1); }
      , (error) => { console.log(error); });

  }
  // add worker
  newItem() {
    let worker = new Worker();
    this._userService.setter(worker);
    this._router.navigate(['/enrolls']);
  }
  // show all workers
  showlist() {
    this._router.navigate(['/']);
  }

  /////////////////////////////////// SECOND PART  ////////////////////////////////////////////

  deletefnc(id: string) {
    this.service.deleteData(id).subscribe(() => {
      this.deletemsg = "1 Record Deleted";
      this.ngOnInit();
    });
  }

  editData(id: string) {
    this.service.editValue(id).subscribe(data => {
      this.profileForm.patchValue(data); // []
      this.ngOnInit();
      this.btnsubmit = false;
      this.btnupdate = true;
    });
  }

  onUpdate(id: string) {
    this.service.updateData(id, this.profileForm.value).subscribe(data => {
      this.msgs = data;
      this.ngOnInit();
      this.profileForm.reset();
    });
  }
}
