import $ from 'jquery';
import lax from 'lax.js';
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });


console.log("lax",lax);

window.onload = function() {
    console.log("lax fired");
	lax.setup({
        breakpoints: { small: 0, large: 992 }
    }) // init

	const updateLax = () => {
		lax.update(window.scrollY)
		window.requestAnimationFrame(updateLax)
	}

	window.requestAnimationFrame(updateLax)
}

$('.lorem-here').append(lorem.generateWords(10)+'<br>'+lorem.generateWords(10)+'<br>'+lorem.generateWords(10)+'<br>'+'<br>'+lorem.generateWords(10)+'<br>'+lorem.generateWords(10));
$('.lorem-header').append(lorem.generateWords(10)+'<br>'+lorem.generateWords(10)+'<br>'+lorem.generateWords(10));

