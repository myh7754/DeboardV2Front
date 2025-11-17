import DOMPurify from 'dompurify';

/**
 * HTML 문자열을 안전하게 sanitize하여 반환합니다.
 * XSS 공격을 방지하면서 허용된 HTML 태그는 유지합니다.
 * 
 * @param {string} dirty - sanitize할 HTML 문자열
 * @param {object} options - DOMPurify 옵션 (선택사항)
 * @returns {string} - sanitize된 HTML 문자열
 */
export const sanitizeHtml = (dirty, options = {}) => {
    // 기본 옵션: 일반적인 HTML 태그와 속성 허용
    const defaultOptions = {
        ALLOWED_TAGS: [
            'a', 'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'img', 'div', 'span',
            'table', 'thead', 'tbody', 'tr', 'td', 'th'
        ],
        ALLOWED_ATTR: [
            'href', 'title', 'alt', 'src', 'width', 'height', 'class', 'id',
            'target', 'rel', 'style', 'decoding', 'align', 'loading'
        ],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
        // 스타일 속성도 허용 (필요시)
        ALLOW_DATA_ATTR: false
    };

    const config = { ...defaultOptions, ...options };
    
    // DOMPurify로 sanitize
    let sanitized = DOMPurify.sanitize(dirty, config);
    
    // 모든 <a> 태그에 target="_blank"와 rel="noopener noreferrer" 추가
    // 속성이 있거나 없는 모든 경우를 처리
    sanitized = sanitized.replace(
        /<a(\s+[^>]*?)?>/gi,
        (match, attributes = '') => {
            const attrs = attributes.trim();
            
            // 이미 target 속성이 있는지 확인
            if (/target\s*=/i.test(attrs)) {
                // target이 이미 있으면 rel만 확인하고 추가
                if (!/rel\s*=/i.test(attrs)) {
                    return attrs ? `<a ${attrs} rel="noopener noreferrer">` : `<a rel="noopener noreferrer">`;
                }
                return match;
            } else {
                // target이 없으면 target과 rel 모두 추가
                if (/rel\s*=/i.test(attrs)) {
                    return attrs ? `<a ${attrs} target="_blank">` : `<a target="_blank">`;
                } else {
                    return attrs ? `<a ${attrs} target="_blank" rel="noopener noreferrer">` : `<a target="_blank" rel="noopener noreferrer">`;
                }
            }
        }
    );
    
    return sanitized;
};

/**
 * HTML 문자열을 텍스트만 추출하여 반환합니다.
 * 모든 HTML 태그를 제거하고 순수 텍스트만 남깁니다.
 * 
 * @param {string} html - HTML 문자열
 * @returns {string} - 추출된 텍스트
 */
export const stripHtml = (html) => {
    if (!html) return '';
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
};

