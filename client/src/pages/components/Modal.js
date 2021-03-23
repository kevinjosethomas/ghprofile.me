import { Spring } from "react-spring/renderprops";

export default function Modal(props) {

  return (
    <div className="Modal w-full h-full fixed flex flex-row items-center justify-center z-100 inset-0 fadein">
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
      {animation => (
        <div style={animation} className="flex flex-row items-start justify-start px-6 py-8 bg-gray-300 rounded-lg max-w-xl">
          <div className="bg-red-200 text-red-600 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex flex-col items-start justify-center mx-4">
            <span className="text-2xl font-inter font-semibold leading-normal">Possible missing view counter</span>
            <span className="text-gray-600">We do not have any view statistics on the profile/repository you provided. Please make sure you have the view counter embed present on your README so we can track how many views your profile/repository receives! Read our docs at <a href="https://docs.ghprofile.me/" target="_blank" className="underline">https://docs.ghprofile.me/</a> to quickly learn how to add your view counter!</span>
          </div>
          <button onClick={props.updateModal.bind(this, false)} className="outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 text-gray-600 outline-none" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      </Spring>
    </div>
  )

}
