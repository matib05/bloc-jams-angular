(function() {
	
	/*
	@function SongPlayer service
	@desc SongPlayer service handles the play/pause aspect of blocJams album
	*/
	function SongPlayer() {
		var SongPlayer = {};
		
		/**
		@desc holds value of the current song which will be played/paused
		@type {Object}
		*/
		var currentSong = null;
		
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
				currentBuzzObject.stop();
				currentSong.playing = null;
			}
		
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});			
			
			currentSong = song;
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
		
		/**
		@function public play
		@param {Object} song
		@desc checks to see if currentSong is set to song clicked. If currentSong is not set to song, it calls setSong(song), and calls playSong(song). If currentSong is already set to song, it checks if currentBuzzObject is paused, and will play the currentBuzzObject
		*/
		SongPlayer.play = function(song) {
			
			if (currentSong !== song) {
				setSong(song);
				playSong(song);
			}
			
			else if (currentSong === song) {
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
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();