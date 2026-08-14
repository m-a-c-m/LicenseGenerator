"use client";

import { useState, useCallback, useMemo } from "react";
import { FiCopy, FiCheck, FiDownload } from "react-icons/fi";

interface Props { locale?: string; }

type LicenseId = "mit" | "apache-2.0" | "gpl-3.0" | "bsd-3-clause" | "isc" | "unlicense";

const LICENSES: { id: LicenseId; name: string; needsYearAuthor: boolean }[] = [
  { id: "mit", name: "MIT", needsYearAuthor: true },
  { id: "apache-2.0", name: "Apache 2.0", needsYearAuthor: true },
  { id: "gpl-3.0", name: "GPL 3.0", needsYearAuthor: true },
  { id: "bsd-3-clause", name: "BSD 3-Clause", needsYearAuthor: true },
  { id: "isc", name: "ISC", needsYearAuthor: true },
  { id: "unlicense", name: "Unlicense", needsYearAuthor: false },
];

function buildLicense(id: LicenseId, year: string, author: string): string {
  switch (id) {
    case "mit":
      return `MIT License

Copyright (c) ${year} ${author}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

    case "isc":
      return `ISC License

Copyright (c) ${year} ${author}

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.`;

    case "bsd-3-clause":
      return `BSD 3-Clause License

Copyright (c) ${year}, ${author}

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`;

    case "unlicense":
      return `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this
software, either in source code form or as a compiled binary, for any purpose,
commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors of this
software dedicate any and all copyright interest in the software to the public
domain. We make this dedication for the benefit of the public at large and to
the detriment of our heirs and successors. We intend this dedication to be an
overt act of relinquishment in perpetuity of all present and future rights to
this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>`;

    case "apache-2.0":
      return `Copyright ${year} ${author}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

The full Apache License 2.0 text is available at:
https://www.apache.org/licenses/LICENSE-2.0.txt`;

    case "gpl-3.0":
      return `${author} — ${year}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

The full GPL-3.0 license text is available at:
https://www.gnu.org/licenses/gpl-3.0.txt`;
  }
}

export default function LicenseGenerator({ locale = "es" }: Props) {
  const isEs = locale === "es";

  const [licenseId, setLicenseId] = useState<LicenseId>("mit");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [author, setAuthor] = useState("");
  const [copied, setCopied] = useState(false);

  const license = LICENSES.find((l) => l.id === licenseId)!;
  const output = useMemo(() => buildLicense(licenseId, year, author || (isEs ? "Tu nombre" : "Your name")), [licenseId, year, author, isEs]);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [output]);

  const download = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "LICENSE";
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  return (
    <div className="space-y-5">
      <div className="space-y-4 rounded-xl border border-border/20 bg-surface/30 p-4">
        <div>
          <label className="mb-2 block text-xs text-text-muted/70">{isEs ? "Licencia" : "License"}</label>
          <div className="flex flex-wrap gap-2">
            {LICENSES.map((l) => (
              <button
                key={l.id}
                onClick={() => setLicenseId(l.id)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  licenseId === l.id
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/30 bg-surface/60 text-text-muted hover:text-text"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        {license.needsYearAuthor && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-text-muted/70">{isEs ? "Año" : "Year"}</label>
              <input
                type="text" value={year} onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-lg border border-border/30 bg-surface/60 px-3 py-2 text-sm text-text"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-text-muted/70">{isEs ? "Autor / Titular" : "Author / Holder"}</label>
              <input
                type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                placeholder={isEs ? "Tu nombre" : "Your name"}
                className="w-full rounded-lg border border-border/30 bg-surface/60 px-3 py-2 text-sm text-text"
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-text-muted">{isEs ? "Resultado (LICENSE)" : "Result (LICENSE)"}</label>
          <div className="flex gap-2">
            <button
              onClick={copy}
              className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              {copied ? <><FiCheck className="text-xs" /> {isEs ? "Copiado" : "Copied"}</> : <><FiCopy className="text-xs" /> {isEs ? "Copiar" : "Copy"}</>}
            </button>
            <button
              onClick={download}
              className="flex items-center gap-1.5 rounded-lg border border-border/30 bg-surface/60 px-2.5 py-1 text-xs font-medium text-text-muted transition-colors hover:text-text"
            >
              <FiDownload className="text-xs" /> {isEs ? "Descargar" : "Download"}
            </button>
          </div>
        </div>
        <textarea
          value={output}
          readOnly
          rows={16}
          spellCheck={false}
          className="w-full resize-none rounded-xl border border-border/30 bg-surface/40 px-4 py-3 font-mono text-xs text-text"
        />
      </div>
      <p className="text-xs text-text-muted/50">
        {isEs ? "Para GPL-3.0 y Apache-2.0 se incluye el resumen y el enlace al texto legal completo, tal y como recomiendan sus propios autores para el fichero LICENSE del proyecto." : "For GPL-3.0 and Apache-2.0 the summary and a link to the full legal text is included, as their own authors recommend for a project's LICENSE file."}
      </p>
    </div>
  );
}
