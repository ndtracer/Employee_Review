import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { TrailerService } from '../_services';



@Component({
  selector: 'app-trailer-inventory',
  templateUrl: './trailer-inventory.component.html',
  styleUrls: ['./trailer-inventory.component.css']
})
export class TrailerInventoryComponent implements OnInit{
  trailers?: any[];

  constructor( private trailerService: TrailerService) {}

  ngOnInit(): void {
      this.trailerService.getAll()
      .pipe(first())
      .subscribe(trailers => this.trailers = trailers);
  }

  deleteTrailer(id: string) {
    const trailer = this.trailers!.find(x => x.id === id);
    console.log("list delete", trailer.id)
    console.log(id)

    trailer.isDeleting = true;
    this.trailerService.delete(trailer.id)
      .pipe(first())
      .subscribe(() => this.trailers = this.trailers!.filter(x => x.id !== id));
  }
}
