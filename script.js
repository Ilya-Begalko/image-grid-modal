gsap.registerPlugin(Flip);

const thumbs = gsap.utils.toArray(".item");
const modal = document.querySelector(".modal");
const toggle = document.querySelector("button");
const modalImage = modal.querySelector(".modal-image");
const wrapper = document.querySelector(".grid-wrapper");

let activeThumb;

// FLIP into modal
thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        activeThumb = thumb;
        thumb.classList.add("active-thumb");
        thumb.dataset.flipId = "img";
        gsap.set(thumb, { opacity: 0 });

        const state = Flip.getState([thumb, modalImage], {
            props: "borderRadius, aspectRatio, boxShadow"
        });

        modalImage.querySelector("img").setAttribute("src", thumb.dataset.url);
        modal.classList.add("active");
        modalImage.style.display = "block";

        Flip.from(state, {
            duration: 0.25,
            ease: "sine.inOut"
        });
    });
});

// FLIP out of modal
modal.addEventListener("click", () => {
    activeThumb.dataset.flipId = "img";
    gsap.set(activeThumb, { opacity: 1 });

    const state = Flip.getState([modalImage, activeThumb], {
        props: "borderRadius, aspectRatio, boxShadow"
    });

    modal.classList.remove("active");

    Flip.from(state, {
        duration: 0.25,
        absolute: true,
        ease: "sine.inOut",
        onComplete: () => {
            modalImage.querySelector("img").setAttribute("src", "");
            activeThumb.classList.remove("active-thumb");
            activeThumb.dataset.flipId = "img";
        }
    });
});

// FLIP views
toggle.addEventListener("click", () => {
    toggle.classList.toggle("grid-view-on");
    const state = Flip.getState(".grid-wrapper, .item-wrapper");
    wrapper.classList.toggle("stack");

    Flip.from(state, {
        absolute: true,
        duration: 0.5,
        stagger: -0.0125,
        ease: "sine"
    });
});
