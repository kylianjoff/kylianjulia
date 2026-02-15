import { Component, Input, OnChanges } from '@angular/core';

import { TagColorService, TagColors } from '../../services/tag-color.service';

@Component({
  selector: 'app-tag-badge',
  standalone: true,
  templateUrl: './tag-badge.html',
  styleUrl: './tag-badge.css'
})
export class TagBadgeComponent implements OnChanges {
  @Input({ required: true }) tag!: string;

  colors: TagColors;

  constructor(private tagColorService: TagColorService) {
    this.colors = this.tagColorService.getColors('');
  }

  ngOnChanges() {
    this.colors = this.tagColorService.getColors(this.tag);
  }
}
