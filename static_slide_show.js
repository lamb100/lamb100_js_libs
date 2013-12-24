/**
 * 跑馬燈的間隔時間(秒)
 * @var integer
 */
var	intStaticSlideTimer = 2;
/**
 * 跑馬燈的現在所在的圖片順序
 * @var	array
 */
var aryStaticSlideIndex = new Array();
/**
 * 跑馬燈所使用的interval
 * @var	array
 */
var aryIntervals = array();
function	StaticSlideShow( strSelector , aryImages )
{
	//判斷是否有截入jQuery
	if( typeof( jQuery ) == 'undefined' )
	{
		alert( 'StaticSlideShow need jQuery.' );
		return false;
	}
	//判斷strSelector的指定DOM物件在不在
	if( jQuery( strSelector ).length <= 0 )
	{
		window.alert( strSelector + ' doesn`s exist.' );
		return false;
	}
	//判斷傳入的圖片「集」，是否為陣列
	if( ! ( typeof aryImages ).match( /^array$/i ) )
	{
		window.alert( 'Please provide an Array to put the images for ' + strSelector );
		return false;
	}
	//先預載圖像
	ImagePreload( aryImages );
	aryStaticSlideIndex[strSelector] = 0;
	//取消先前設定的週期指令
	if( typeof aryIntervals[strSelector] != 'undefined' )
	{
		window.clearInterval( aryIntervals[strSelector] );
	}
	//設定的週期指令
	aryIntervals[strSelector] = window.setInterval( function()
	{
		jQuery( strSelector ).attr( 'src' , aryImages[aryStaticSlideIndex[strSelector]] );
		aryStaticSlideIndex[strSelector]++;
		aryStaticSlideIndex[strSelector] = aryStaticSlideIndex[strSelector] % aryImages.length;
	}, intStaticSlideTimer * 2000 );
}

function	ImagePreload( aryImages )
{
	if( ! ( typeof aryImages ).match( /^array$/i ) )
	{
		ImagePreload( this.toString() );
	}else
	{
		var objImage = new Image();
		objImage.src = aryImages;
	}
	return;
}