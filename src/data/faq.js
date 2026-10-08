// STAGING MOCK — Replace with CMS or Supabase query

export function getFaqCategories(isMk) {
  return [
    {
      id: 'students',
      title: isMk ? 'За учениците и родителите' : 'For students & parents',
      items: [
        {
          question: isMk
            ? 'Кој може да се запише на лекции?'
            : 'Who can sign up for lessons?',
          answer: isMk
            ? 'PeerUp е отворен за ученици од основно и средно образование во Македонија. За ученици под 18 години, потребна е согласност на родителот или старателот при регистрација.'
            : 'PeerUp is open to primary and secondary school students in Macedonia. For students under 18, parental or guardian consent is required at registration.',
        },
        {
          question: isMk
            ? 'Дали лекциите се безбедни за деца?'
            : 'Are lessons safe for children?',
          answer: isMk
            ? 'Секој ментор поминува низ строг процес на проверка пред да биде одобрен. Лекциите се одржуваат преку Google Meet со документирана врска. Имаме политика за заштита на деца и јасен канал за пријавување проблеми.'
            : 'Every mentor goes through a strict verification process before being approved. Lessons are held via Google Meet with a documented link. We have a child-protection policy and a clear channel for reporting issues.',
        },
        {
          question: isMk
            ? 'Колку трае една лекција?'
            : 'How long is one lesson?',
          answer: isMk
            ? 'Стандардната лекција трае 45 минути. Оваа вредност е конфигурабилна и може да се промени пред пуштањето на пилотот.'
            : 'The standard lesson lasts 45 minutes. This may be adjusted before the pilot launch.',
        },
        {
          question: isMk
            ? 'Можам ли да откажам или да презакажам лекција?'
            : 'Can I cancel or reschedule a lesson?',
          answer: isMk
            ? 'Да. Правилата за откажување и рефундирање ќе бидат објавени пред отворањето на пилот програмата. Секогаш ќе има разумен период за откажување без казна.'
            : 'Yes. Cancellation and refund policies will be published before the pilot opens. There will always be a reasonable cancellation window with no penalty.',
        },
        {
          question: isMk
            ? 'Дали добивам потврда по резервација?'
            : 'Do I receive a confirmation after booking?',
          answer: isMk
            ? 'Да, по успешна резервација и плаќање ќе добиете потврда на е-пошта со деталите за лекцијата и линкот за Google Meet.'
            : 'Yes, after a successful booking and payment you will receive an email confirmation with the lesson details and Google Meet link.',
        },
      ],
    },
    {
      id: 'mentors',
      title: isMk ? 'За менторите' : 'For mentors',
      items: [
        {
          question: isMk
            ? 'Кој може да стане ментор?'
            : 'Who can become a mentor?',
          answer: isMk
            ? 'Апликации прифаќаме од ученици и студенти со одличен успех кои сакаат да им помогнат на своите врсници. Секој апликант поминува низ интервју и проверка пред одобрување.'
            : 'We accept applications from high-achieving students who want to help their peers. Every applicant goes through an interview and background check before being approved.',
        },
        {
          question: isMk
            ? 'Колку заработуваат менторите?'
            : 'How much do mentors earn?',
          answer: isMk
            ? 'Надоместокот и условите за исплата ќе бидат објаснети пред менторот да ја прифати конечната спогодба. Сите детали се во процес на финализирање.'
            : 'Compensation and payout terms will be explained before the mentor accepts the final agreement. All details are currently being finalized.',
        },
        {
          question: isMk
            ? 'Како се пријавувам за ментор?'
            : 'How do I apply to become a mentor?',
          answer: isMk
            ? 'Пополни ја апликацијата за ментор (кликни тука). Тимот ќе ве контактира за следните чекори.'
            : 'Fill out the mentor application (click here). Our team will contact you about the next steps.',
        },
      ],
    },
    {
      id: 'booking',
      title: isMk ? 'Резервации и плаќање' : 'Booking & payment',
      items: [
        {
          question: isMk
            ? 'Кои начини на плаќање се прифаќаат?'
            : 'Which payment methods are accepted?',
          answer: isMk
            ? 'Плаќањето се врши преку безбеден банкарски портал. PeerUp не зачувува и не обработува директно податоци за картичка. Деталите за поддржани методи ќе бидат објавени пред пилотот.'
            : 'Payment is processed through a secure banking portal. PeerUp does not store or directly process card data. Supported payment methods will be announced before the pilot.',
        },
        {
          question: isMk
            ? 'Дали е безбедно плаќањето онлајн?'
            : 'Is online payment safe?',
          answer: isMk
            ? 'Да. Целото плаќање минува низ безбеден, шифриран портал. Вашите финансиски податоци никогаш не доаѓаат директно до PeerUp.'
            : 'Yes. All payments go through a secure, encrypted portal. Your financial data never reaches PeerUp directly.',
        },
        {
          question: isMk
            ? 'Што се случува ако менторот не се појави?'
            : 'What happens if the mentor does not show up?',
          answer: isMk
            ? 'Во случај на отсуство на менторот без претходно известување, ќе добиете целосно рефундирање. Имаме јасна процедура за вакви ситуации.'
            : 'If the mentor is absent without prior notice, you will receive a full refund. We have a clear procedure for such situations.',
        },
      ],
    },
    {
      id: 'technical',
      title: isMk ? 'Техничка поддршка' : 'Technical support',
      items: [
        {
          question: isMk
            ? 'Каква опрема ми е потребна?'
            : 'What equipment do I need?',
          answer: isMk
            ? 'Компјутер, таблет или телефон со камера и микрофон, стабилна интернет врска и Google Meet (бесплатно, без инсталација во прелистувач).'
            : 'A computer, tablet, or phone with a camera and microphone, a stable internet connection, and Google Meet (free, no installation needed in a browser).',
        },
        {
          question: isMk
            ? 'Што ако се скрши линкот за Meet?'
            : 'What if the Meet link is broken?',
          answer: isMk
            ? 'Контактирај нè преку страницата за поддршка. Нашиот тим ќе испрати нов линк во рок од неколку минути.'
            : 'Contact us via the support page. Our team will send a new link within a few minutes.',
        },
        {
          question: isMk
            ? 'Кого да контактирам при технички проблем?'
            : 'Who should I contact for a technical issue?',
          answer: isMk
            ? 'Посети ја страницата Контакт или испрати е-пошта на poddrska@peerup.mk. За итни проблеми за време на лекција, постои директно копче за поддршка во апликацијата.'
            : 'Visit the Contact page or email poddrska@peerup.mk. For urgent issues during a lesson, there is a direct support button in the app.',
        },
      ],
    },
  ]
}
