const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'data', 'emerging_themes.json');
const outputPath = path.join(__dirname, 'data', 'email_report.html');

try {
  if (!fs.existsSync(inputPath)) {
    // Generate fallback email if no analysis exists
    const fallbackHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #ff3f6c;">Myntra Wishlist Conversion - Weekly Report</h2>
          <p>Hi PM Team,</p>
          <p>The weekly review scraping completed successfully. However, the emerging themes analysis is pending database history.</p>
          <p>Please log in to the <a href="http://localhost:3000/">Myntra Wishlist Conversion Dashboard</a> to view the latest active reviews.</p>
          <p>Best regards,<br>Myntra Growth Intelligence Bot</p>
        </body>
      </html>
    `;
    fs.writeFileSync(outputPath, fallbackHtml, 'utf8');
    console.log('Analysis file missing. Wrote fallback HTML report.');
    process.exit(0);
  }

  const reportData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const { generated_at, provider, analysis } = reportData;

  let themesHtml = '';
  if (analysis.emerging_themes && analysis.emerging_themes.length > 0) {
    themesHtml = analysis.emerging_themes.map(t => `
      <div style="background-color: #fcf6f8; border-left: 4px solid #ff3f6c; padding: 12px; margin-bottom: 15px; border-radius: 4px;">
        <h4 style="margin: 0 0 8px 0; color: #ff3f6c;">Theme: ${t.theme} (${t.direction})</h4>
        <p style="margin: 0 0 6px 0;"><strong>Evidence:</strong> ${t.evidence}</p>
        <p style="margin: 0 0 6px 0;"><strong>Risk Statement:</strong> ${t.risk_statement}</p>
        <p style="margin: 0;"><strong>Recommended Monitor:</strong> ${t.recommended_monitor}</p>
      </div>
    `).join('');
  } else {
    themesHtml = '<p>No emerging themes detected this week (insufficient historical variations).</p>';
  }

  let hypothesesHtml = '';
  if (analysis.new_problem_hypotheses && analysis.new_problem_hypotheses.length > 0) {
    hypothesesHtml = '<ul style="margin: 0; padding-left: 20px;">' + 
      analysis.new_problem_hypotheses.map(h => `<li style="margin-bottom: 6px;">${h}</li>`).join('') + 
      '</ul>';
  } else {
    hypothesesHtml = '<p>No new problem hypotheses generated this week.</p>';
  }

  const emailHtml = `
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
        <div style="text-align: center; border-bottom: 2px solid #ff3f6c; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #ff3f6c; margin: 0;">Myntra Wishlist Conversion</h2>
          <span style="font-size: 12px; color: #666;">Growth Team Intelligence Report — ${new Date(generated_at).toLocaleDateString()}</span>
        </div>
        
        <p>Hi PM Team,</p>
        <p>The weekly analysis of public Myntra feedback from App Stores, Reddit, Quora, and Shopping Communities is complete.</p>

        <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #333;">📢 Emerging Weekly Themes</h3>
        ${themesHtml}

        <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px; color: #333; margin-top: 25px;">💡 New Problem Hypotheses (Non-Monetary Opportunities)</h3>
        ${hypothesesHtml}

        <div style="background-color: #f9f9f9; padding: 12px; margin-top: 25px; border-radius: 4px; font-size: 13px; color: #555;">
          <strong>Caveat:</strong> ${analysis.caveat || 'None'}
        </div>

        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #888; text-align: center;">
          <p>Generated via LLM provider: <strong>${provider}</strong></p>
          <p>Access the full research suite on the <a href="http://localhost:3000/" style="color: #ff3f6c;">Local Research Dashboard</a></p>
          <p>Myntra Growth Team Intelligence Bot &copy; 2026</p>
        </div>
      </body>
    </html>
  `;

  fs.writeFileSync(outputPath, emailHtml, 'utf8');
  console.log('Successfully formatted HTML email report.');
} catch (error) {
  console.error('Error formatting email report:', error.message);
  process.exit(1);
}
