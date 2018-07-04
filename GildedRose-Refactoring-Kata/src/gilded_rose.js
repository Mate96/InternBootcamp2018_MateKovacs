class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.rules = this.getRules();
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      let AgedBrie = item.name == 'Aged Brie';
      let BackstagePass = item.name == 'Backstage passes to a TAFKAL80ETC concert';
      let Sulfuras = item.name == 'Sulfuras, Hand of Ragnaros';

      if(!Sulfuras){

        if (!AgedBrie && !BackstagePass && item.quality > 0) {
          item.quality -= 1;
        } else {
          if (item.quality < 50) {
            item.quality += 1;
            if (BackstagePass) {
              if (item.sellIn < 11 && item.quality < 50) {
                item.quality += 1;
              }
              if (item.sellIn < 6 && item.quality < 50) {
                item.quality += 1;
              }
            }
          }
        }

        item.sellIn -= 1;

        if (item.sellIn < 0) {
          if (!AgedBrie) {
            if (!BackstagePass && item.quality > 0) {
              item.quality -= 1;
            } else {
              item.quality = 0;
            }
          } else {
            if (item.quality < 50) {
              item.quality += 1;
            }
          }
        }

      }
    }

    return this.items;
  }
}
