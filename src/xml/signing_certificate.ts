import { XmlElement, XmlAttribute, XmlChildElement } from "xml-core";
import { XmlBase64Converter } from "xml-core";
import { XmlSignature, X509IssuerSerial } from "xmldsigjs";

import { XmlXades } from "./xml";
import { XadesObject, XadesCollection } from "./xml_base";

/**
 * 
 * <xsd:element name="SigningCertificate" type="CertIDListType"/>
 * <xsd:complexType name="CertIDListType">
 *     <xsd:sequence>
 *         <xsd:element name="Cert" type="CertIDType" maxOccurs="unbounded"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * <xsd:complexType name="CertIDType">
 *     <xsd:sequence>
 *         <xsd:element name="CertDigest" type="DigestAlgAndValueType"/>
 *         <xsd:element name="IssuerSerial" type="ds:X509IssuerSerialType"/>
 *     </xsd:sequence>
 *     <xsd:attribute name="URI" type="xsd:anyURI" use="optional"/>
 * </xsd:complexType>
 * <xsd:complexType name="DigestAlgAndValueType">
 *     <xsd:sequence>
 *         <xsd:element ref="ds:DigestMethod"/>
 *         <xsd:element ref="ds:DigestValue"/>
 *     </xsd:sequence>
 * </xsd:complexType>
 * 
 */

@XmlElement({ localName: XmlXades.ElementNames.DigestAlgAndValue })
export class DigestAlgAndValueType extends XadesObject {

    @XmlChildElement({
        localName: XmlSignature.ElementNames.DigestMethod,
        namespaceURI: XmlSignature.NamespaceURI,
        prefix: XmlSignature.DefaultPrefix,
        required: true,
    })
    DigestMethod: string;

    @XmlChildElement({
        localName: XmlSignature.ElementNames.DigestMethod,
        namespaceURI: XmlSignature.NamespaceURI,
        prefix: XmlSignature.DefaultPrefix,
        converter: XmlBase64Converter,
        required: true,
    })
    DigestValue: Uint8Array;

}

@XmlElement({ localName: XmlXades.ElementNames.Cert })
export class Cert extends XadesObject {

    @XmlChildElement({ localName: XmlXades.ElementNames.CertDigest, parser: DigestAlgAndValueType, required: true })
    CertDigest: DigestAlgAndValueType;


    @XmlChildElement({ localName: XmlXades.ElementNames.IssuerSerial, parser: X509IssuerSerial, required: true })
    IssuerSerial: X509IssuerSerial;

    @XmlAttribute({ localName: XmlXades.AttributeNames.URI })
    Uri: string;

}

@XmlElement({ localName: "CertIDList" })
export class CertIDList extends XadesCollection<Cert> { }

@XmlElement({ localName: XmlXades.ElementNames.SigningCertificate })
export class SigningCertificate extends CertIDList { }