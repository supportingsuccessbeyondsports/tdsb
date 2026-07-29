(function(){
  var ball = document.getElementById('cursor-ball');
  if(ball && window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    var icons = ['🏀','⚽','🏈','🎾','⚾','🏐'];
    var idx = 0;

    document.addEventListener('mousemove', function(e){
      ball.style.transform = 'translate(' + (e.clientX - 13) + 'px,' + (e.clientY - 13) + 'px)';
      ball.classList.add('active');
    });
    document.addEventListener('mouseleave', function(){
      ball.classList.remove('active');
    });

    setInterval(function(){
      idx = (idx + 1) % icons.length;
      ball.textContent = icons[idx];
    }, 4000);
  }
})();

(function(){
  var items = document.querySelectorAll('.reveal-item');
  if(!items.length) return;

  if('IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.2, rootMargin:'0px 0px -30px 0px'});

    items.forEach(function(item){ observer.observe(item); });
  } else {
    items.forEach(function(item){ item.classList.add('visible'); });
  }
})();

(function(){
  var btn = document.getElementById('scroll-top-btn');
  if(!btn) return;

  function toggleVisibility(){
    if(window.scrollY > 400){
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleVisibility, {passive:true});
  toggleVisibility();

  btn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });
})();

(function(){
  var checkboxes = Array.prototype.slice.call(document.querySelectorAll('.sc-item input[type="checkbox"]'));
  var countEl = document.getElementById('sc-count');
  var totalEl = document.getElementById('sc-total');
  var barEl = document.getElementById('sc-bar');
  var messageEl = document.getElementById('sc-message');

  if(!checkboxes.length || !countEl || !totalEl || !barEl || !messageEl) return;

  var total = checkboxes.length;
  totalEl.textContent = total;

  var messages = [
    "Check off what's already true for you — the rest is worth trying this week.",
    "A start. Pick one more habit from the list to focus on next.",
    "Good progress — you're covering more ground than you might think.",
    "Solid footing across most areas. Keep an eye on what's still unchecked.",
    "Strong balance across the board. That takes real intention — keep it up."
  ];

  function update(){
    var checkedCount = checkboxes.filter(function(cb){ return cb.checked; }).length;
    countEl.textContent = checkedCount;
    var pct = total ? (checkedCount / total) * 100 : 0;
    barEl.style.width = pct + '%';
    barEl.classList.toggle('full', checkedCount === total);

    var msgIndex = Math.min(Math.floor((checkedCount / total) * (messages.length - 1)), messages.length - 1);
    messageEl.textContent = checkedCount === 0 ? messages[0] : messages[msgIndex];
  }

  checkboxes.forEach(function(cb){
    cb.addEventListener('change', update);
  });

  update();
})();
