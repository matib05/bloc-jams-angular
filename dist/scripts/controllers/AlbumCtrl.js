(function() {
	function AlbumCtrl() {
		this.albumData = angular.copy(albumPicaso);
		
	}
	
	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl);
})();