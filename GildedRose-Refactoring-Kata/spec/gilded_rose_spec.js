describe("Quality", function() {
/*
  it("name doesn't change", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("default items update sellIn correctly", function() {
    const gildedRose = new Shop([ new Item("foo", 1, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(0);
  });
*/

  describe("default items", function(){

    it("default items update quality correctly before sellIn", function() {
      const gildedRose = new Shop([ new Item("foo", 2, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(4);
    });

    it("default items update quality correctly past sellIn", function() {
      const gildedRose = new Shop([ new Item("foo", 0, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(3);
    });

    it("default items' quality cannot decrease below 0", function() {
      const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

  })

  describe("Aged brie", function(){

    it("Aged brie updates quality correctly", function() {
      const gildedRose = new Shop([ new Item("Aged Brie", -1, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(7);
    });

    it("Aged brie's quality cannot exceed 50", function() {
      const gildedRose = new Shop([ new Item("Aged Brie", 0, 50) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

  })

  describe("Backstage pass", function(){

    it("Backstage pass updates quality correctly when sellIn > 10", function() {
      const gildedRose = new Shop([ new Item('Backstage passes to a TAFKAL80ETC concert', 12, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(6);
    });

    it("Backstage pass updates quality correctly when 5 < sellIn < 10", function() {
      const gildedRose = new Shop([ new Item('Backstage passes to a TAFKAL80ETC concert', 7, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(7);
    });

    it("Backstage pass updates quality correctly when sellIn <= 5", function() {
      const gildedRose = new Shop([ new Item('Backstage passes to a TAFKAL80ETC concert', 3, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8);
    });

    it("Backstage pass updates quality correctly past sellIn", function() {
      const gildedRose = new Shop([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 5) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("Backstage pass's quality cannot exceed 50'", function() {
      const gildedRose = new Shop([ new Item('Backstage passes to a TAFKAL80ETC concert', 3, 50) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

  })

  describe("Sulfuras", function(){

    it("Quality of Sulfuras doesn't change", function() {
      const gildedRose = new Shop([ new Item('Sulfuras, Hand of Ragnaros', undefined, 10) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(10);
    });

  })

});
