/* 1. Render songs
2. Scroll top
3. Play / pause / seek
4. CD rotate
5. Next / prev
6. Random
7. Next / Repeat when ended
8. Active song
9. Scroll active song into view
10. Play song when click */
 

const $ = document.querySelector.bind(document)
 const $$ = document.querySelectorAll.bind (document)

 const heading = $('header h2')
 const cdThumb = $('.cd-thumb') /* thumbnail */
 const audio = $('#audio') 
 const playBtn = $('.btn-toggle-play')
 const player = $('.player')
 const progress = $('#progress')
 const nextBtn = $('.btn-next')
 const prevBtn = $('.btn-prev')
 const randomBtn = $('.btn-random')
 const repeatBtn = $('.btn-repeat')
 const playlist = $('.playlist')

 var count =0;
 var arrayTemp = [];

 alert('Lười nên chỉ code trước có 10 bài thui =)), rảnh e thêm')

 const app = {
   currentIndex: 0,
   isPlaying: false, /* mặc định là nó false, khi play thì set nó bằng true */
   isRandom: false,
   isRepeat: false,
   songs:  [
        {
              name: 'How You Like That',
              singer: 'Black Pink',
              path: './assets/music/song1.mp3',
              image: './assets/img/song1.png',
         },
         {
              name: '3107 3',
              singer: 'W/n ft.Nâu, Duongg, Titie',
              path: './assets/music/song2.mp3',
              image: './assets/img/song2.png',
            },
            {
            name: 'Cheating on You',
              singer: 'Charlie Puth',
              path: './assets/music/song3.mp3',
              image: './assets/img/song3.png',
        },
            {
            name: 'Heat Waves',
              singer: 'Glass Animals - DjKomangRimex',
              path: './assets/music/song4.mp3',
              image: './assets/img/song4.png',
        },
            {
            name: 'comethru',
              singer: 'Jeremy Zucker',
              path: './assets/music/song5.mp3',
              image: './assets/img/song5.png',
        },
        {
        name: 'At My Worst',
          singer: 'Pink Sweat',
          path: './assets/music/song6.mp3',
          image: './assets/img/song6.png',
    },
    {
    name: 'Rather Be Without Me Mashup',
      singer: 'Eminem ft Clean Bandit',
      path: './assets/music/song7.mp3',
      image: './assets/img/song7.png',
},
            {
            name: 'Reality',
              singer: 'Lost Frequencies',
              path: './assets/music/song8.mp3',
              image: './assets/img/song8.png',
        },
            {
            name: 'You Belong With Me',
              singer: 'Taylor Swift',
              path: './assets/music/song9.mp3',
              image: './assets/img/song9.png',
        },
            {
            name: 'Thức Giấc',
              singer: 'Da LAB',
              path: './assets/music/song10.mp3',
              image: './assets/img/song10.png',
        }
    ],
    render:function() {
      const htmls = this.songs.map((song, index) => {
        return `
        <div data-index="${index}" class="song ${index === this.currentIndex ? 'active' : ''}">
                <div class="thumb"
                     style="background-image: url('${song. image}')">
                 </div>
                <div class="body">
                     <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                 </div>
                 <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                 </div>
            </div>
            `
    })
    /* không lặp lại thì gọi thẳng, còn lặp lại thì đặt biến */
    $('.playlist').innerHTML = htmls.join('')  /* render bài hát vào class playlist */
    },


    defineProperties: function() {

      /* search gg xem syntax defineProperty */
      Object.defineProperty(this, 'currentSong', {
        get: function() {
          return this.songs[this.currentIndex]
        }
      })
    },


    /* hàm sử lý sự kiện trong web */
    handleEvents: function() {

      /* mấy thằng này nằm ở bên trong 1 lớp function nữa ( là function con của handleEvents) nên this ở đây là app ko trỏ tới được, nếu xài this là nó trỏ tới cái khác */
      const _this = this

      const cd = $('.cd')
      const cdWidth = cd.offsetWidth /* lấy cd width của nó, kích thước mặc định */

                /* xử lí CD quay và dừng */
                const cdThumbAnimate = cdThumb.animate([
                  { transform: 'rotate(360deg)'}
            ], {
                /* animate còn tham số 2 */
                  duration: 10000, /* Thời lượng quay 1 vòng ( 10s ) */
                  iterations: Infinity, /* quay bao nhiêu vòng */
            })
            cdThumbAnimate.pause()

      /* xử lí phóng to / thu nhỏ CD */
      document.onscroll = function () {

        /* cuộn lên thì làm cái ảnh trong cd thu nhỏ tới 1 lúc nào đó sẽ biến mất ( từ 200px về 0 )*/
        const scrollTop = window.scrollY || document.documentElement.scrollTop /* documentElement là Element của thẻ HTML */
        const newCdWidth = cdWidth - scrollTop
        
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 
        /* kéo nhanh quá nó sẽ ra giá trị âm nên cần phải dùng toán tử để check, nếu lỡ kéo nhanh quá thành âm thì nó sẽ mặc định bằng 0 */

        cd.style.opacity = newCdWidth / cdWidth
         /* mờ dần lấy kích thước mới chia kích thước cũ */
      },

      // Xử lý khi click play
      playBtn.onclick = function() {
        if (_this.isPlaying) {
          /* nếu đang play thì phải pause và ngược lại */
              audio.pause()
        } else {
              audio.play()
        }
      }

      /* khi bài hát được play */
      audio.onplay = function() {
        /* nếu this bthg thì nó sẽ là của audio, nó sẽ sai */
        _this.isPlaying = true
        player.classList.add("playing")
        cdThumbAnimate.play()
        /* cách nhanh nhất là console.log ra coi methods của nó, cũng phải check trong __proto__ viết tắt prototype bởi vì nó cũng kế thừa  */
      }

      /* khi bài hát bị pause */
      audio.onpause = function() {
        _this.isPlaying = false
        player.classList.remove("playing")
        cdThumbAnimate.pause()
      }

      /* khi tiến độ bài hát thay đổi */
      audio.ontimeupdate = function() {
        /* phải check thằng duration vì giá trị đầu tiên của nó là NaN */
        if (audio.duration) {
          const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
          console.log(audio.currentTime / audio.duration * 100)
          progress.value = progressPercent
          progress.style.background = 'linear-gradient(to right, #ec1f55 0%, #ec1f55 ' + progressPercent + '%, #d3d3d3 ' + progressPercent + '%, #d3d3d3 100%)' /* làm thanh thời gian kéo dài từ đầu tới cuối */
        }
      }

      /* xử lí khi tua bài hát */
      /* đổi onchange thành oninput sẽ không bị giựt */
      progress.oninput = function(e) {
        /* e.target.value là % ta lấy được khi tua tới chỗ nào đó */
        /* audio.duration là tổng thời gian bài hát đó chạy */
        const seekTime = e.target.value * audio.duration / 100
        audio.currentTime = seekTime
      }

      /* khi bấm nút next bài hát có bật nút random */
      nextBtn.onclick  = function(e) {

        if (_this.isRandom) {
          /* nếu */
          _this.playRandomSong()
        } else {
          _this.nextSong()
        }

        audio.play() /* nó có 1 cái bug là khi bài hát đang play mà bấm next nó sẽ không play nữa nên phải thêm cái này vào đây */
        _this.scrollToActiveSong()
      }

      /* khi prev bài hát */
      prevBtn.onclick = function(e) {

        if (_this.isRandom) {
          _this.playRandomSong()
        } else {
          _this.prevSong()
        }

        audio.play()
        _this.scrollToActiveSong()
      }

      /* khi bấm vào nút random */
      randomBtn.onclick = function(e) {

          _this.isRandom = !_this.isRandom
        this.classList.toggle('active', _this.isRandom) /* ko dùng e.target vì bấm trúng icon nó sẽ bị lỗi */
        /* đọc kĩ API của toggle, truyền đối số thứ 2 là Boolean, Boolean true thì add, false thì remove */

      }

      // Xử lý khi ấn nút repeat
      repeatBtn.onclick = function(e) {
 
        _this.isRepeat = !_this.isRepeat  /* đảo lại thành true */
          this.classList.toggle('active', _this.isRepeat)

          /* thuộc tính có sẵn của HTML Audio */
          if(_this.isRepeat){
            audio.loop=true;
        }else{
            audio.loop=false;
        }
        }

      // Xử lý khi hết bài hát có bật nút repeat
      audio.onended = function () {

        /* nếu có bật nút repeat thì hát lại vì đã đảo thành boolean true   */
        if (app.isRepeat) {
          audio.play()
        } else {
          nextBtn.click()
        }
    }
      
      /* xử lí bài hát khi chạy hết có bật random */
      audio.onended = function() {
        if (_this.isRandom) {
          _this.playRandomSong()
        } else {
          _this.nextSong()
        }
        audio.play()
        /* thay từ if tới audio.play() thay bằng nextBtn.click(), này là máy tự bấm next khi hết bài  */
      }

      /* Lắng nghe hành vi khi click vào playlist */
        playlist.onclick = function (e) {

          /* e là cái event chúng ta nhận được ở đây, target là đích mà chúng ta click vào */
          let songNode = e.target.closest('.song:not(.active)'); /* bắt sự kiện click nào thằng song nào mà không có active */
          /* closet trả về cho mình cái element 1 là chính nó 2 là cái thẻ cha của nó, nếu không tìm thấy element thì nó sẽ trả về null */

          /* bấm vào bất kì đâu của song trừ nút 3 chấm */
          if (!e.target.closest('.option')) {
            if (songNode) {
              _this.currentIndex = Number(songNode.dataset.index); /* current index khi nãy là số, nhưng khi get ra từ cái element như này, thì nó là chuỗi */
              _this.loadCurrentSong();
              audio.play();
            }
          }

          /* trường hợp bấm vào nút 3 chấm */
          if (e.target.closest('.option')){
            alert('Chưa có code xong, bấm lung tung không =))')
          }
        }
    },
      /* Scroll to view */ 

      scrollToActiveSong: function() {
        setTimeout(() => {
          if (this.currentIndex <= 3) {
            $('.song.active').scrollIntoView({
              behavior: 'smooth',
              block: 'end',
            });
          } else {
            $('.song.active').scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }, 300);
    },


    loadCurrentSong: function() { 
      heading.textContent = this.currentSong.name
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path

      /* thêm này để khỏi render lại, nếu nhiều bài hát quá khi render lại sẽ bị giật */
      if ($('.song.active')) {
        $('.song.active').classList.remove('active');
      }
      const list = $$('.song');
      list.forEach((song) => {
        if (song.getAttribute('data-index') == this.currentIndex) {
          song.classList.add('active');
        }
      });
    },

    nextSong: function() {
      this.currentIndex++

      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0
      }

      this.loadCurrentSong()
    },

    prevSong: function() {
      this.currentIndex--

      if (this.currentIndex < 0) {
         this.currentIndex = this.songs.length - 1 /* set về bài hát cuối ( phải có trừ 1 để quay về thành phần cuối mảng) */
      }

      this.loadCurrentSong()
    },

    playRandomSong: function() {
      let newIndex 
      newIndex = Math.floor(Math.random() * this.songs.length)
      if(count >0) { 
        do {
          newIndex = Math.floor(Math.random() * this.songs.length)
          var isCheck= arrayTemp.includes(newIndex);
      } while (isCheck == true) {
        arrayTemp[count]=newIndex;
                this.currentIndex = newIndex;
                this.loadCurrentSong();
                if(count == this.songs.length-1)
                {
                    arrayTemp=[];
                    count=-1;
                }
                count++;
      } 
      /* lặp ngẫu nhiên, nếu lặp dính cái cũ thì lặp tiếp và random hết 1 mảng, sẽ random lại mảng mới, tránh bị cứ cách 2-3 bài lại quay về bài cũ */
      }
     

      this.currentIndex = newIndex /* phải set lại */
      this.loadCurrentSong()
    },

    /*tạo ra function nào thi phải gọi function đó */
    start: function() {

      /* định nghĩa các thuộc tính cho Object */
      this.defineProperties()

      /* lắng nghe và xử lý các sự kiện */
      this.handleEvents()

      /* tải thông tin bài hát đầu tiên vào UI ( user interface ) khi chạy ứng dụng*/
      this.loadCurrentSong()

      /* render lại playlist */
        this.render()
    }

 }

 app.start()