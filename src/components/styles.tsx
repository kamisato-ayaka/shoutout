import Styled from 'styled-components'

export const Container = Styled.div`
    height: 100vh;
`
export const FormDiv = Styled(Container)`
    background: #B99B8B;
`
export const Dboard = Styled(Container)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    max-width: 502px;
    width: 100%;
    margin-top: 50px;
    background: #fff !important;
`
export const P = Styled.p`
    font-family: 'Raleway';
    font-size: 12px;
    color: #575757;
    text-align: left;
`
export const Box = Styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translate(-50%, -50%);
    max-width: 421px;
    width: 100%;
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, .16);
    border-radius: 14px;
    text-align: center;
`
export const FormLogo = Styled.div`
    margin-top: 100px;
    margin-bottom: 35px;
    cursor: pointer;
`
export const FormGroup = Styled.div`
    margin: auto;
    margin-bottom: 35px;
    width: 243.5px;
`
export const FormTextDiv = Styled.div`
    margin-top: 65px;
    margin-bottom: 100px;
`
export const FormText = Styled(P)`
    text-align: center !important;
    cursor: pointer;
`
export const FormInvalid = Styled(P)`
    text-align: center !important;
    font-weight: 700;
    color: #BF917B !important;
    cursor: default;
`
export const BoldP = Styled.b`
    color: #BF917B !important;
`
export const ButtonDiv = Styled.div`
    margin-top: 55px;
`
export const Button = Styled.button`
    background: #BF917B;
    border-style: none;
    border-radius: 14px;
    width: 243px;
    padding: 7.5px 0;
    color: #fff;
    font-family: 'Raleway';
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
`
export const Header = Styled.div`
    overflow: hidden;
    margin-bottom: 20px;
`
export const Logo = Styled.div`
    float: left
`
export const SearchDiv = Styled.div`
    display: inline-block;
    float: right;
    border: .75px solid #E6E6E6;
    border-radius: 14px;
    margin: 12px 2px;
`
export const PostDiv = Styled.div`
    overflow: hidden;
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, .16);
    margin-bottom: 25px;
    border-radius: 14px;
    padding: 10px 20px;
    text-align: center;
`
export const UserInfo = Styled.div`
    margin: 15px 0;
    font-family: 'Raleway';
    font-size: 12px;
    color: #575757;
    text-align: center !important;
`
export const UserGroup = Styled(PostDiv)`
`
export const UserNameInfo = Styled(P)`
    margin-top: 0 !important;
    margin-bottom: 30px !important;
    color: #BF917B !important;
    text-align: center !important;
`
export const UserLink = Styled.div`
    float: left;
    cursor: pointer;
`
export const UserText = Styled(FormText)`
    margin-top: 3px !important;
    text-transform: capitalize;
`
export const UserButton = Styled(Button)`
    width: 128px !important;
    display: block !important;
    margin: auto !important;
`
export const FollowGroup = Styled.div`
    display: inline-block;
    width: 68px;
    margin: 0 12.5px;
`
export const PostGroup = Styled.div`
    float: right;
    margin-top: 10px !important;
    width: 390px;
    word-wrap: break-word;
`
export const SocialGroup = Styled.div`
    float: right;
`
export const SocialText = Styled(P)`
    margin: 0 !important;
    padding: 0 5px;
    font-size: 15px !important;
    color: #A7A7A7 !important;
    display: inline-block;
`
export const SocialLink = Styled.div`
    display: inline-block;
    cursor: pointer;
`
export const H1 = Styled.h1`
    margin-bottom: 5px;
    font-family: 'Raleway';
    font-size: 20px;
    font-weight: 600;
    text-transform: Capitalize;
    color: #575757;
`
export const H2 = Styled.h2`  
    margin-top: 8px;
    font-family: 'Raleway';
    font-size: 15px;
    font-weight: 600;
    color: #575757;
`
export const H1User = Styled(H1)`
    margin: 0 !important;
    font-weight: 800 !important;
    color: #BF917B !important;
`
export const H2Feed = Styled(H2)`
    margin-top: 30px;
    font-weight: unset !important;
    text-align: left;
    color: #676767 !important;
    cursor: default;
`
export const H3 = Styled.h3`
    font-family: 'Raleway';
    font-size: 12px;
`