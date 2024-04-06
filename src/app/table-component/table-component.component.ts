import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PoButtonModule, PoTableModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [PoTableModule, PoButtonModule ],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.css'
})
export class TableComponentComponent  implements OnInit {
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  items = []
  private interval: any;
  private scrollSpeed = 2000; // Velocidade da rolagem em milissegundos

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<any>('https://po-sample-api.onrender.com/v1/people').subscribe(response => {
    this.items = response.items;
    });


  }
  ngOnDestroy() {
    // Limpa o intervalo quando o componente é destruído
     this.stopAutoScroll();
  }

  startAutoScroll(): void {
    this.interval = setInterval(() => {
      this.scrollTable();
    }, this.scrollSpeed);
  }

  stopAutoScroll(): void {
    clearInterval(this.interval);
  }

  scrollTable(): void {
    const table = this.tableContainer.nativeElement;
    table.scrollTop += 20; // Velocidade da rolagem. Ajuste conforme necessário.

    // Verifique se chegou ao final da tabela e reinicie a rolagem
    if (table.scrollHeight - table.scrollTop === table.clientHeight) {
      table.scrollTop = 0;
    }
  }



  onClickButton(){
    this.startAutoScroll()
  }

  onClickButtonFim(){
    this.stopAutoScroll
  }

}
