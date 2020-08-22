class Food {
    constructor() {
        this.foodStock
        this.lastFed
        this.image = loadImage("Milk.png");
    }
    getFoodStock() {
        /* database.ref('Food').on("value",function (data){
            this.foodStock = data.val();
        }) */
        return this.foodStock
    }
    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }
    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1;
        }
    }
    display() {
        
        imageMode(CENTER);
        var x = 80;
        var y = 100;
        if (this.foodStock != 0) {

            for (var i = 0; i < this.foodStock; i++) {

                if (i % 10 == 0) {
                    x = 80; 
                    y = y + 50;
                }

                image(this.image, x, y, 50, 50);
                x = x + 30;
            }

        }
    }
    garden(){
        console.log("garden background");
        background(garden,150,150);
    }
    bedroom(){
        console.log("bedroom background");
        background(bedroom,150,150);
    }
    washroom(){
        console.log("washroom background");
        background(bathroom,150,150);
    }
}