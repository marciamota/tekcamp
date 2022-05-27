/**
 * this function toggles the class hidden of the answer element
 */
toggleAccordionItem = (event) => {
    // get reference to clicked section
    const clickedQuestion = event.currentTarget;
    // get reference to answer element p, (next sibling of section)
    const faqAnswer = clickedQuestion.nextElementSibling;
    // get class List from p element (answer element)
    const classList = faqAnswer.classList;
    // toggles class hidden in p element (answer element)
    classList.toggle('hidden');
};

// selects all LI elements, alternative document.querySelectorAll('li')
const faqItems = document.getElementsByClassName('faq-item');

// loop through the li elements to add an event listener to their section elements
for (const faqItem of faqItems) {
    // selects section element inside LI
    const faqItemSection = faqItem.querySelector('section');
    // adds click event to section element
    // I don't add the listener to the li element because 
    // I don't want it to trigger if I click on the answer
    faqItemSection.addEventListener('click', toggleAccordionItem);
}

