
//function to convert string to Title Case
function ConvertTitleCase(str) {
	const strArr = str.toLowerCase().split(" ");
	for (let i = 0; i < strArr.length; i++) {
		strArr[i] = strArr[i][0].toUpperCase() + strArr[i].slice(1);
	}
	return strArr.join(" ");
}