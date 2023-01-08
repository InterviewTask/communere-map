import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ILocation } from '../../models';
import { ShareLocationComponent } from '../share-location/share-location.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() data?: ILocation;
  @Output() dataChange :EventEmitter<ILocation>= new EventEmitter();
  @Output() onClose :EventEmitter<boolean>= new EventEmitter();
  @Output() onRemove :EventEmitter<boolean>= new EventEmitter();
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.onClose.emit(true);
  }
  remove(){
    this.onRemove.emit(true);
  }

  openEdit(){
    const config: MatDialogConfig = {
      width: '30%',
      maxHeight: '90vh',
      data: {
        defaultPosition: [this.data?.position.lat,this.data?.position.lng],
        feed:  this.data
      }
    }
    const dialogRef = this.dialog.open(ShareLocationComponent, config)

    dialogRef.afterClosed().subscribe(
      (data: ILocation) => {
       if(data){
        this.dataChange.emit(data);
       }
      }
    )
  }
}
