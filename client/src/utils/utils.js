import { withBaseIcon, Icon } from 'react-icons-kit'
import {bin} from 'react-icons-kit/icomoon/bin'
import {facebook} from 'react-icons-kit/entypo/facebook'
import {instagram} from 'react-icons-kit/entypo/instagram'
import {linkedin} from 'react-icons-kit/entypo/linkedin'
import {twitter} from 'react-icons-kit/entypo/twitter'
import Swal from 'sweetalert2';

//Importing icons from react-icons-kit
const SideIconContainer = 
    withBaseIcon({ size: 32, style: {color: '#EF233C'}})

export const Bin = () => <SideIconContainer icon={bin}/>
export const Face = () =>  <Icon icon={facebook} size={32}/>
export const Insta = () =>  <Icon icon={instagram} size={32}/>
export const Linke = () =>  <Icon icon={linkedin} size={32}/>
export const Twit = () =>  <Icon icon={twitter} size={32}/>

//Base url to axios
export const URL_BOOK = "http://localhost:4000/books";

//Function to show a small alert after creating a book
export const createAlert = () => {
    Swal.fire({
        icon: 'success',
        text: 'Book added successfully!',
    })
}

export const showAlertSuccessImages = () => {
    Swal.fire({
        icon: 'success',
        text: 'Image/s added successfully'
    })
}

export const editBookAlert = () => {
    Swal.fire({
        icon: 'success',
        text: 'Book edited successfully'
    })
}

//Capitalize the first letter of each word in a sentence
export const toCapitalize = (str) => {
    return str.replace(/\b\w/g, function(x) {
        return x.toUpperCase()
    })
}

//Convert String to Date
export const toDate = ( strDate ) => {
    let date = new Date( strDate );

    let day = date.getUTCDate().toString().padStart(2, '0');
    let month = ( date.getUTCMonth() + 1 ).toString().padStart(2, "0");
    let year = date.getUTCFullYear().toString();

    return `${day}/${month}/${year}`;
}