import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { LocationService } from 'src/app/_services/location.service';




@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  // styleUrls: ['./locations.component.css'],
})

export class LocationsComponent implements OnInit {
  locations?: any[];

  constructor( private locationService: LocationService) {}

  ngOnInit(): void {
      this.locationService.getAll()
      .pipe(first())
      .subscribe(locations => this.locations = locations);
  }

  deleteLocation(id: string) {
    const location = this.locations!.find(x => x.id === id);
    location.isDeleting = true;
    this.locationService.delete(id)
      .pipe(first())
      .subscribe(() => this.locations = this.locations!.filter(x => x.id !== id));
  }
}
