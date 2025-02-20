import React, { useState, useRef, useEffect } from "react";
import "./ConsentForm.css";
import SignatureCanvas from "react-signature-canvas";

const ConsentForm = ({ currentStep, prevStep, formData, setFormData, handleChange }) => {
  const patientSigCanvas = useRef(null);
  const witnessSigCanvas = useRef(null);
  const clinicianSigCanvas = useRef(null);

  const clearAllSignatures = () => {
    patientSigCanvas.current.clear();
    witnessSigCanvas.current.clear();
    clinicianSigCanvas.current.clear();
  };

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

  const saveAllSignatures = () => {
    saveSignature(patientSigCanvas, "patientSignature");
    saveSignature(witnessSigCanvas, "witnessSignature");
    saveSignature(clinicianSigCanvas, "clinicianSignature");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <form onSubmit={handleSubmit} id="consent-form">
      <h1>INFORMED CONSENT</h1>

      {/* Treatment Consent Section */}
      <div>
        <h2>TREATMENT TO BE DONE</h2>
        <p>
          I understand and consent to have any treatment done by the dentist
          after the procedure, the risk & benefits, and cost have been fully
          explained. These treatments include, but are not limited to, x-rays,
          cleanings, periodontal treatments, fillings, crowns, bridges, all
          types of extraction, root canals and/or dentures, local anesthetics,
          and surgical cases.
        </p>
        <label>
          Initial:
          <input
            type="text"
            name="treatmentConsent"
            value={formData.treatmentConsent}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <h2>DRUGS & MEDICATIONS</h2>
        <p>
          I understand that antibiotics, analgesics, and other medications can
          cause allergic reactions causing redness and swelling of tissues,
          pain, itching, vomiting, and/or anaphylactic shock.
        </p>
        <label>
          Initial:
          <input
            type="text"
            name="drugsConsent"
            value={formData.drugsConsent}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <h2>CHANGES IN TREATMENT PLAN</h2>
        <p>
          I understand that during treatment, it may be necessary to change/add
          procedures because of conditions found while working on the teeth that
          were not discovered during the examination.
        </p>
        <label>
          Initial:
          <input
            type="text"
            name="changesConsent"
            value={formData.changesConsent}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <h2>RADIOGRAPH</h2>
        <p>
          II understand that x-ray shot or a radiograph maybe necessary as part
          of diagnostic aid to come up with tentative diagnosis of my dental
          problem and to make a good treatment plan, but, this will not give me
          a 100% assurance for the accuracy of the treatment since all dental
          treatments are subject to unpredictable complications that later on
          may lead to sudden change of treatment plan and subject to new
          changes.
        </p>
        <label>
          Initial:
          <input
            type="text"
            name="radiographConsent"
            value={formData.radiographConsent}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <h2>REMOVAL OF TEETH</h2>
        <p>
          I understand that alternatives to tooth removal (root canal therapy,
          crowns & periodontal surgery, etc.) and I agree completely that these
          alternatives, including their risk & benefits prior to authorizing the
          dentist to remove teeth and any others necessary for reasons above. I
          understand that removing teeth does not always remove all the
          infections, if present and it may be necessary to have further
          treatment. I understand the risk involved in having teeth removed,
          some of which are pain, swelling, spread of infection, dry socket,
          fractured jaw, loss of feeling teeth, lips, tongue & surrounding
          tissue that can last for an indefinite period of time. I understand
          that I may need further treatment of specialist if complications arise
          during or following treatment.
        </p>
        <label>
          Initial:
          <input
            type="text"
            name="removalConsent"
            value={formData.removalConsent}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <h2>CROWNS (CAPS) & BRIDGES</h2>
        <p>
          Preparing a tooth may irritable the nerve tissue in the center of the
          tooth, leaving your tooth feeling sensitive to heat, cold & pressure.
          Treating such irritation may involve using special toothpastes or
          mouth rinses or root canal therapy. I understand that sometimes it is
          not possible to match the color of natural teeth exactly with
          artificial teeth. I further understand that I may be wearing temporary
          crowns, which may come off easily and that I must be careful to ensure
          that they are kept on until the permanent crowns are delivered. It is
          my responsibility to return for permanent cementation within 20 days
          from tooth preparation, as excessive days delay may allow for tooth
          movement, which may necessitate a remake of the crown, bridge/cap. I
          understand there will be additional charges for remakes due to my
          delaying of permanent cementation and I realize that final opportunity
          to make changes in my new crown, bridges or cap (including shape, fit,
          size and color) will be before permanent cementation.
        </p>
        <label>
          Initial:
          <input
            type="text"
            name="crownsConsent"
            value={formData.crownsConsent}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <h2>ENDODONTICS (ROOT CANAL)</h2>
        <p>
          I understand there is no guarantee that root canal treatment will save
          a tooth and that complications can occur from the treatment and that
          occasionally root canal filling materials may extend through that
          tooth which does not necessarily effect the success of the treatment.
          I understand that endodontic files and drills are very fine
          instruments and stresses vented in their manufacture & clarifications
          present in teeth can cause them to break during use. I understand that
          referral to the endodontist for additional treatments may be necessary
          following any root canal treatment and I agree that I am responsible
          for any additional cost for treatment performed by the endodontist. I
          understand that a tooth may require in spite of all efforts to save
          it.
        </p>
        <label>
          Initial:
          <input
            type="text"
            name="rootCanalConsent"
            value={formData.rootCanalConsent}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <h2>PERIODONTAL DISEASE</h2>
        <p>
          I understand that periodontal disease is a serious condition causing
          gums & bone inflammation and/or loss and that can lead to the loss of
          my teeth. I understand that alternative treatment plans to correct
          periodontal disease, including gum surgery tooth extractions with or
          without replacement. I understand that undertaking any dental
          procedures may have future adverse effect on my periodontal
          conditions.
        </p>
        <label>
          Initial:
          <input
            type="text"
            name="periodontalConsent"
            value={formData.periodontalConsent}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <h2>FILLINGS</h2>
        <p>
          I understand that care must be exercised in chewing on fillings,
          especially during the first 24 hours to avoid breakage. I understand
          that a more extensive filling or a crown may be required, as
          additional decay or fracture may become evident after initial
          excavation. I understand that significant sensitivity is a common, but
          usually temporary, after effect of a newly placed filling. I further
          understand that filling a tooth may irritate the nerve tissue creating
          sensitivity and treating such sensitivity could require root canal
          therapy or extractions.
        </p>
        <label>
          Initial:
          <input
            type="text"
            name="fillingsConsent"
            value={formData.fillingsConsent}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <h2>DENTURES</h2>
        <p>
          I understand that wearing of dentures can be difficult. Sore spots,
          altered speech & difficulty in eating are common problems. Immediate
          dentures (placement of denture immediately after extractions) may be
          painful. Immediate dentures may require considerable adjusting and
          several relines. I understand that it is my responsibility to return
          for delivery of dentures. I understand that failure to keep my
          delivery appointment may result in poorly fitted dentures. If a remake
          is required due to my delays of more than 30 days, there will be
          additional charges. A permanent reline will be needed later, which is
          not included fee. I understand that all adjustments or alterations of
          any kind after this initial period is subject to charges.
        </p>
        <label>
          Initial:
          <input
            type="text"
            name="denturesConsent"
            value={formData.denturesConsent}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="consent1" className="checkbox-label">
          <input type="checkbox" id="consent1" required />
          <span className="checkbox-text">
            I understand that dentistry is not an exact science and that no
            dentist can properly guarantee results.
          </span>
        </label>
        <label htmlFor="consent2" className="checkbox-label">
          <input type="checkbox" id="consent2" required />
          <span className="checkbox-text">
            I hereby authorize any of the dentists to proceed with and perform
            the dental restorations & treatments as explained to me. I
            understand that this is subject to modification depending on
            undiagnosable circumstances that may arise during the course of
            treatment. I understand that regardless of any dental insurance
            coverage I may have, I am responsible for payment of dental fees. I
            agree to pay my attorney’s fees, collection fee, or court costs that
            may be incurred to satisfy any obligation to this office. All
            treatments were properly explained to me, and any untoward
            circumstances that may arise during the procedure, the attending
            dentist will not be held liable since it is my free will with full
            trust and confidence to undergo dental treatment under their care.
          </span>
        </label>
      </div>

      <div>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Signatures Section */}
      <div className="form-container">
        <h2>Signatures</h2>

        <div className="form-grid">
          <div>
            <label>Patient/Parent Guardian:</label>
            <SignatureCanvas
              ref={patientSigCanvas}
              penColor="black"
              canvasProps={{
                width: 300,
                height: 100,
                style: { border: "1px solid black" },
              }}
            />
          </div>

          <div>
            <label>Witness:</label>
            <SignatureCanvas
              ref={witnessSigCanvas}
              penColor="black"
              canvasProps={{
                width: 300,
                height: 100,
                style: { border: "1px solid black" },
              }}
            />
          </div>

          <div>
            <label>Clinician's:</label>
            <SignatureCanvas
              ref={clinicianSigCanvas}
              penColor="black"
              canvasProps={{
                width: 300,
                height: 100,
                style: { border: "1px solid black" },
              }}
            />
          </div>
        </div>

        <div className="form-grid">
          <button type="button" onClick={clearAllSignatures}>
            Clear
          </button>
          <button type="button" onClick={saveAllSignatures}>
            Save
          </button>
        </div>
      </div>

      <div className="form-container">
        <div className="form-grid">
          <button type="button" onClick={prevStep}>
            Previous
          </button>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default ConsentForm;
