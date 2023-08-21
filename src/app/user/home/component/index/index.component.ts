// import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart_Service/cart.service';
import { AdminService } from 'src/app/service/admin.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // data_setbg:any;
  posts: any;
  categories_section_begin: any;
  category: any;
  show_by_cate_product_13: any;
  show_by_cate_product_14: any;
  show_by_cate_product_15: any;
  all_product: any;
  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [5, 10, 15, 20];
  //end

  // totalquanlity: number = this.cartService.getcarttotalquanlity();

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    // navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor(private admin: AdminService,
    private cartService: CartService) { }
  private subscription: Subscription
  ngOnInit(): void {

    this.getall_categories_section_begin();
    this.get_posts();

    // gọi hàm loadCart() mới có dữ liệu cho hàm getItem()
    this.cartService.loadCart();
    // console.log( this.cartService.loadCart())
    this.items = this.cartService.getItems();
    console.log('haha',this.items)
    // this.get_prodcut_by_cate();


  }
  getall_categories_section_begin() {
    this.subscription = this.admin.get_index_product().subscribe((data: any) => {
      console.log(data);
      console.log(data.product);
      this.categories_section_begin = data.product;
      this.category = data.category;
      // this.show_by_cate_product=data.show_by_cate_product;
      this.all_product = data.all_product;
    }, error => {
      console.log(error);
    }
    )

  }

  get_posts() {
    this.subscription = this.admin.get_index_posts().subscribe((data: any) => {
      console.log(data.posts_index);
      // console.log(data.type_posts);
      this.posts = data.posts_index;
      // this.type_posts = data.type_posts;
    }, error => {
      console.log(error);
    })
  }

  //phân trang
  ontableDataChange(event: any) {
    this.page = event;
    this.getall_categories_section_begin();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getall_categories_section_begin();
  }


  
    // if(!this.cartService.productInCart(products)){
    //   products.quantity =1;
    //   // this.subTotal=products.price;
    //   // console.log(this.subTotal);
    //   this.cartService.addToCart(products)
    //   this.items = [...this.cartService.get_product()];

  // onaddtocart(products: any) {
  //   console.log('111')
  //   let idx = this.cartService.GetCarts().findIndex((item: any) => {
  //     console.log('item.id',item.id);
  //     return item.id == products.PRO_ID
  //   });
  //   if (idx >= 0) {
  //     this.cartService.GetCarts()[idx].quantity += 1;
  //   } else {
  //     let cartitem: any = {
  //       id: products.PRO_ID,
  //       name: products.ProName,
  //       price: products.ProPrice,
  //       image: products.ProImage,
  //       quantity: 1,
  //       subtotal: function () {
  //         return this.price * this.quantity;
  //       }
  //     }
  //     this.cartService.GetCarts().push(cartitem)
  //   }

  //   // this.cartService.savecart()
  //   // // this.cartService.savecart(this.cartService.GetCarts())
  //   // // Swal.fire({
  //   // //   title: 'Thêm vào giỏ hàng thành công',
  //   // //   icon: 'success'
  //   // // });
  //   // // this.totalquanlity=this.pro.getcarttotalquanlity();
  //   // // alert('thêm giỏ hàng thành công!')
  //   // console.log('them thanh cong')
  //   // this.totalquanlity = this.cartService.getcarttotalquanlity();
  // }



  items:any = [];
  addToCart(item:any) {
    if (!this.cartService.itemInCart(item)) {
      item.qtyTotal = 1;
      this.cartService.addToCart(item); //add items in cart
      this.items = [...this.cartService.getItems()];
      this.getall_categories_section_begin();
      alert('Đã thêm thành công 1 sản phẩm vào giỏ hàng!')
    }
  }

}
