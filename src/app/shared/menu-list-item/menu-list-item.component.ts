import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavItem } from 'src/app/core/model/nav-item';
import { NavService } from 'src/app/core/ui/nav.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/storage/storage.service';


@Component({
    selector: 'app-menu-list-item',
    templateUrl: './menu-list-item.component.html',
    styleUrls: ['./menu-list-item.component.scss'],
    animations: [
        trigger('indicatorRotate', [
            state('collapsed', style({ transform: 'rotate(0deg)' })),
            state('expanded', style({ transform: 'rotate(180deg)' })),
            transition('expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
            ),
        ])
    ]
})
export class MenuListItemComponent implements OnInit {
    expanded: boolean = false;

    @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
    @Input() item: NavItem;
    @Input() depth: number;


    @Output()
    public onChildItemClick = new EventEmitter<void>();

  constructor(
    public navService: NavService,
    public router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private storageService: StorageService) {

        if (this.depth === undefined) {
            this.depth = 0;
        }
    }

    ngOnInit() {
        this.navService.getCurrentUrl().subscribe((url: string) => {
            if (this.item.route) {
                this.expanded = url.indexOf(`/${this.item.route}`) === 0;
                this.ariaExpanded = this.expanded;
            }
        });
    }

    onItemSelected(item: NavItem) {
        this.dialog.closeAll();

        if (!item.children || !item.children.length) {
            if (item.route) {
                this.router.navigate([item.route]);
            } else {
                this.handleSpecial(item);
            }
        }

        if (item.children && item.children.length) {
            this.expanded = !this.expanded;
        }
    }

    handleSpecial(item: NavItem) {
        if (item.displayName == 'Sign Out') {
            // this.handleSignOut();
        }
    }
    onChildClick() {
      this.onChildItemClick.emit();
    }
}
