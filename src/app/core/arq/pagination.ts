
const length =  5;
export class Pagination{
    items : any[];
    total : number;
    page: number;
    totalPages  : number;

    setItems(obj){
      this.items = obj.items;
      this.totalPages = obj.pages;
      this.total = obj.total;
    }
    getItems(){
      return this.items;
    }
    getTotal(){
      return this.total;
    }
    getTotalPages(){
      return this.totalPages;
    }
    setPage(page){
      this.page = page;
    }
    getPage(){
      return this.page;
    }
    arrayPages(): any[] {
      return Array(this.getTotalPages());
    }
    getTamanho(){
        return length;
    }

}