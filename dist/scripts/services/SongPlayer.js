(function() {
	
	/*
	@function SongPlayer service
	@desc SongPlayer service handles the play/pause aspect of blocJams album
	*/
	function SongPlayer(Fixtures) {
		var SongPlayer = {};
		
		/*
		@desc holds an Object of an album
		@type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();
		
		/*
		@function getSongIndex
		@param song
		@desc returns the index of the currently playing song
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		}
		
		/**
		@desc holds value of the current song which will be played/paused
		@type {Object}
		*/
		SongPlayer.currentSong = null;
		
		/**
		*@desc Buzz object audio file
		*@type {Object}
		*/
		var currentBuzzObject = null;
		
		
		/**
		*@function setSong
		*@desc Stops currently playing song and loads new audio file as currentBuzzObject
		*@param {Object} song
		*/
		var setSong = function(song) {
		
			if (currentBuzzObject) {
				stopSong(song);
			}
		
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});			
			
			SongPlayer.currentSong = song;
		}
		
		/**
		@function playSong
		@desc plays the currentSong and sets song.playing to true
		@param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		}
		
		/*
		@function stopSong
		@param {Object} song
		@desc stops the currentBuzzObject and sets the SongPlayer.currentSong.playing to null
		*/
		var stopSong = function(song) {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
		}
		
		/**
		@function public play
		@param {Object} song
		@desc checks to see if SongPlayer.currentSong is set to song clicked. If SongPlayer.currentSong is not set to song, it calls setSong(song), and calls playSong(song). If SongPlayer.currentSong is already set to song, it checks if currentBuzzObject is paused, and will play the currentBuzzObject
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			}
			
			else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
		};
		
		/**
		@function public pause
		@param {Object} song
		@desc pauses currentBuzzObject and sets the song.playing property to false
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		/**
		@function public previous
		@desc it first retrieves and decrements the index of the currently playing song. Then it checks if index is less than 0, and if it is, it stops the currentBuzObject. If it isn't, it calls setSong and playSong functions to play the respective song
		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			if (currentSongIndex < 0) {
				stopSong(SongPlayer.currentSong);
			}
			else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		}
		
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			if (currentSongIndex > currentAlbum.songs.length-1) {
				stopSong(SongPlayer.currentSong);
			}
			else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		}
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();