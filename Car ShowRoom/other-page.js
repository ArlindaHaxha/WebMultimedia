// Define your image URLs here
const images = [
    'audi1.jpeg',
    'audi2.jpeg',
    'audi3.png',
    'audi4.png',
    'audi5.jpeg',
];

// Create PIXI application
const app = new PIXI.Application({ width: 800, height: 600 });
document.getElementById('slide-container').appendChild(app.view);

// Load images and create sprites
const loader = new PIXI.Loader();
for (let i = 0; i < images.length; i++) {
    loader.add('image' + i, images[i]);
}
loader.load((loader, resources) => {
    const sprites = [];
    for (let i = 0; i < images.length; i++) {
        const sprite = new PIXI.Sprite(resources['image' + i].texture);
        sprite.width = app.screen.width;
        sprite.height = app.screen.height;
        sprite.visible = (i === 0); // Show the first image, hide the rest
        sprites.push(sprite);
        app.stage.addChild(sprite);
    }

    // Function to change slide
    let currentIndex = 0;
    function changeSlide(index) {
        sprites.forEach((sprite, i) => {
            sprite.visible = (i === index);
        });
        currentIndex = index;
    }

    // Auto change slides every 3 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        changeSlide(currentIndex);
    }, 3000);
});
