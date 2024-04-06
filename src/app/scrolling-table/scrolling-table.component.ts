import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoButtonModule, PoStepperModule, PoTableModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-scrolling-table',
  standalone: true,
  imports: [CommonModule, PoButtonModule, PoTableModule, PoStepperModule, FormsModule ],
  templateUrl: './scrolling-table.component.html',
  styleUrl: './scrolling-table.component.css'
})
export class ScrollingTableComponent  implements OnInit, OnDestroy {
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  private interval: any;
  private scrollSpeed = 100; // Velocidade da rolagem em milissegundos

  @Input() items: any[] = [];
  currentIndex = 0;
  scrollInterval: any;
  velocidade = 0

  ngOnInit() {

    //this.startAutoScroll();

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
    this.velocidade = 0
    clearInterval(this.interval);
  }

  scrollTable(): void {
    const table = this.tableContainer.nativeElement;
    table.scrollTop += this.velocidade; // Velocidade da rolagem. Ajuste conforme necessário.

    // Verifique se chegou ao final da tabela e reinicie a rolagem
    if (table.scrollHeight - table.scrollTop === table.clientHeight) {
      table.scrollTop = 0;
    }
  }


  onClickButton(){
    this.velocidade = 1
    this.startAutoScroll()
  }
  onClickButtonFim(){
    this.stopAutoScroll()

  }
  updateValor(){

  }
  handleMenuClick(item: any){}
}
