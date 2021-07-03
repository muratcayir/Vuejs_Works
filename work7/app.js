new Vue({
  el: "#app",
  data: {
    player_heal: 100,
    monster_heal: 100,
    logs: [],
    game_is_on: false,
    attack_multiple: 10,
    special_attack_multiple: 15,
    heal_up_multiple: 25,
    monster_attack_multiple: 15,
    log_text: {
      attack: "Oyuncu saldırıda bulunuyor ",
      special_attack: "Oyuncu özel güçlerini kullandı",
      monster_attack: "Canavar karşılık veriyor",
      heal_up: "Oyuncuya ilk yardım yapılıyor ",
    },
  },
  methods: {
    start_game: function () {
      this.game_is_on = true;
    },

    attack: function () {
      var point = Math.ceil(Math.random() * this.attack_multiple);
      this.monster_heal -= point;
      this.add_to_log({
        turn: "p",
        text: "Oyuncu saldırıda bulunuyor (" + point + ")",
      });
      this.monster_attack();
    },

    special_attack: function () {
      var point = Math.ceil(Math.random() * this.special_attack_multiple);
      this.monster_heal -= point;
      this.add_to_log({
        turn: "p",
        text: "Oyuncu özel güçlerini kullandı (" + point + ")",
      });
      this.monster_attack();
    },

    heal_up: function () {
      var point = Math.ceil(Math.random() * this.heal_up_multiple);
      this.player_heal += point;
      this.add_to_log({
        turn: "p",
        text: "Oyuncuya ilk yardım yapılıyor (" + point + ")",
      });
      this.monster_attack();
    },

    give_up: function () {
      this.player_heal = 0;
    },

    monster_attack: function () {
      var point = Math.ceil(Math.random() * this.monster_attack_multiple);
      this.player_heal -= point;
      this.add_to_log({
        turn: "m",
        text: "Canavar karşılık veriyor (" + point + ")",
      });
    },
    add_to_log: function (log) {
      this.logs.push(log);
    },
  },
  watch: {
    player_heal: function (value) {
      if (value <= 0) {
        this.player_heal = 0;
        if (confirm("GAMER OVER ... DO YOU WANT TO CONTIUNE?")) {
          (this.monster_heal = 100), (this.player_heal = 100), (this.logs = []);
        }
      } else if (value >= 100) {
        this.player_heal = 100;
      }
    },

    monster_heal: function (value) {
      if (value <= 0) {
        this.monster_heal = 0;
        if (confirm("CONGRATULATIONS... DO YOU WANT TO CONTIUNE?")) {
          (this.monster_heal = 100), (this.player_heal = 100), (this.logs = []);
        }
      }
    },
  },
  computed: {
    player_progress: function () {
      return { width: this.player_heal + "%" };
    },
    monster_progress: function () {
      return { width: this.monster_heal + "%" };
    },
  },
});
